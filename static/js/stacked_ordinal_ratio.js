// Name: StackedRatioBarChart
// Description: A stacked bar chart for ordinal data with ratio values.
// Original Code: https://observablehq.com/@d3/stacked-bar-chart
// License: Same as the original code (ISC License)
function StackedRatioBarChart(data, {
    x = (d, i) => i, // given d in data, returns the (ordinal) x-value
    y = d => d, // given d in data, returns the (quantitative) y-value
    z = () => 1, // given d in data, returns the (categorical) z-value
    xz = () => 1, // given d in data, returns the (categorical) xz-value for stacked bars
    title, // given d in data, returns the title text
    marginTop = 30, // top margin, in pixels
    marginRight = 0, // right margin, in pixels
    marginBottom = 30, // bottom margin, in pixels
    marginLeft = 50, // left margin, in pixels
    width = 900, // outer width, in pixels
    height = 320, // outer height, in pixels
    xDomain, // array of x-values
    xRange = [marginLeft, width - marginRight], // [left, right]
    xPadding = 0.1, // amount of x-range to reserve to separate bars
    yType = d3.scaleLinear, // type of y-scale
    yDomain, // [ymin, ymax]
    yRange = [height - marginBottom, marginTop], // [bottom, top]
    xzDomain, // array of z-values
    offset = d3.stackOffsetNone, // stack offset method
    order = d3.stackOrderNone, // stack order method
    yFormat, // a format specifier string for the y-axis
    yLabel, // a label for the y-axis
    colors = d3.schemeTableau10, // array of colors

    // newly added parameters
    zDomain, // 
    zDomainMap, // array of xz-values against specific x-value for stacked bars (e.g., { "1-3-0" => ["1-3-0-1", ..., "1-3-5-5"], ...})
    xzPadding = 0.16, // amount of x-range to reserve to separate bars
} = {}) {
    // Compute values.
    const X = d3.map(data, x);
    const Y = d3.map(data, y);
    const Z = d3.map(data, z);
    const XZ = d3.map(data, xz); // additional xz value for stacked bars

    // Compute default x- and z-domains, and unique them.
    if (xDomain === undefined) xDomain = X;
    if (zDomain === undefined) zDomain = Z;
    if (xzDomain === undefined) xzDomain = XZ;
    xDomain = new d3.InternSet(xDomain);
    zDomain = new d3.InternSet(zDomain);
    xzDomain = new d3.InternSet(xzDomain);

    // Omit any data not present in the x- and z-domains.
    const I = d3.range(X.length).filter(i => xDomain.has(X[i]) && zDomain.has(Z[i])); // e.g., [0,1,...,210]
    
    // Compute a nested array of series where each series is [[y1, y2], [y1, y2],
    // [y1, y2], …] representing the y-extent of each stacked rect. In addition,
    // each tuple has an i (index) property so that we can refer back to the
    // original data point (data[i]). This code assumes that there is only one
    // data point for a given unique x- and z-value.
    // Moreover, we now expand the dataset to include xz values for stacked bars.
    let new_series_gens = {}; // store multiple series generators for each x value
    Object.entries(zDomainMap).forEach(function([x_key, z_values]) {
	new_series_gens[x_key] = d3.stack()
	    .keys(z_values)
	    .value(function([x, I], z) {
		return Y[I.get(z)]; // return the percentage value for a specific z value
	    })
	    .order(order)
	    .offset(offset);
    });
    const series_group_data = d3.group(I.map(oi => ({
	...data[oi],
	oi: oi
    })), d => d.id);
    const series_data = d3.merge(d3.map(series_group_data, function(d) {
	const tmp_series_data = d3.rollup(d[1], ([i]) => i.oi, i => XZ[i.oi], i => Z[i.oi]);
	return new_series_gens[d[0]](tmp_series_data);
    }));
    const series = series_data.map(function(s) {
	    return s.map(function(d) {
		return Object.assign(d, {i: d.data[1].get(s.key)});
	    })
    });
    
    // Compute the default y-domain. Note: diverging stacks can be negative.
    if (yDomain === undefined) yDomain = d3.extent(series.flat(2));

    // Construct scales, axes, and formats.
    const xScale = d3.scaleBand(xDomain, xRange).paddingInner(xPadding);
    const xzScale = d3.scaleBand(xzDomain, [0, xScale.bandwidth()]).padding(xzPadding);
    const yScale = yType(yDomain, yRange);
    const color = d3.scaleOrdinal(xzDomain, colors);
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(height / 60, yFormat);

    // Compute titles.
    if (title === undefined) {
	const formatValue = yScale.tickFormat(100, yFormat);
	title = i => `${X[i]}\n${Z[i]}\n${formatValue(Y[i])}`;
    } else {
	const O = d3.map(data, d => d);
	const T = title;
	title = i => T(O[i], i, data);
    }

    const svg = d3.create("svg")
	  .attr("width", width)
	  .attr("height", height)
	  .attr("viewBox", [0, 0, width, height])
	  .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    // draw y-axis
    svg.append("g")
	.attr("transform", `translate(${marginLeft},0)`)
	.call(yAxis)
	.call(g => g.select(".domain").remove())
	.call(g => g.selectAll(".tick line").clone()
	      .attr("x2", width - marginLeft - marginRight)
	      .attr("stroke-opacity", 0.1))
	.call(g => g.append("text")
	      .attr("x", -marginLeft)
	      .attr("y", 10)
	      .attr("fill", "currentColor")
	      .attr("text-anchor", "start")
	      .text(yLabel));

    // drawing stacked bars
    const bar = svg.append("g")
	  .selectAll("g")
	  .data(series)
	  .join("g")
	  .attr("fill", ([{i}]) => color(Z[i]))
	  .selectAll("rect")
	  .data(function(d) {
	      return d ;
	  })
	  .join("rect")
	  .attr("x", function({i}) {
	      return xScale(X[i]) + xzScale(XZ[i]);
	  })
	  .attr("y", ([y1, y2]) => Math.min(yScale(y1), yScale(y2)))
	  .attr("height", ([y1, y2]) => Math.abs(yScale(y1) - yScale(y2)))
	  .attr("width", xzScale.bandwidth());
    if (title) bar.append("title")
	.text(({i}) => title(i));
    
    svg.append("g")
    	.attr("transform", `translate(0,${height - marginBottom})`)
    	.call(xAxis);

    return Object.assign(svg.node(), {scales: {color}});
}
