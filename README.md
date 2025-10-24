
# Hugo D3.js Stacked Bar Chart Demo

A modern, multilingual Hugo site demonstrating D3.js data visualization with a custom stacked ordinal ratio bar chart implementation. Built on the Hugo i18n template foundation with accessibility features, dark mode support, and responsive design.

## 🌟 Features

- **D3.js Data Visualization**: Interactive stacked ordinal ratio bar chart with custom implementation
- **Multilingual Support**: Japanese and English with easy language switching

### Multilingual Support

The site supports both Japanese and English languages. Users can switch between languages using the provided toggle button.

The D3.js chart tooltips and labels are localized based on the selected language.

The basic structure is derived from the [github.com/YasuhiroABE/hugo-i18nsite-template](https://github.com/YasuhiroABE/hugo-i18nsite-template) project.

## 🚀 Quick Start

### Prerequisites

- [Hugo Extended](https://gohugo.io/installation/) (v0.151.2 or later)
- Modern web browser with JavaScript enabled

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/YasuhiroABE/hugo-d3js-stackedbarchart.git
   cd hugo-d3js-stackedbarchart
   ```

2. Install dependencies (optional):
   ```bash
   make up
   ```

3. Open your browser to `http://localhost:1313`

### Viewing the D3.js Demo

The main page displays a customized stacked bar chart that visualizes survey data across multiple years. 

The chart features:

- **Multi-year Data**: Survey data spanning from 2016 to 2023 as XZ-axis.
- **Satisfaction Ratings**: Data shows responses on a 1-5 scale
- **Bilingual Support**: Switch between Japanese and English to see localized tooltips

## 📁 Project Structure

```
hugo-d3js-stackedbarchart/
├── archetypes/          # Content templates
├── content/             # Site content
│   ├── _index.ja.adoc   # Japanese homepage
│   ├── _index.en.adoc   # English homepage
│   └── data.json        # Survey data for D3.js chart
├── data/                # Data files
│   ├── ja/              # Japanese data
│   └── en/              # English data
├── i18n/                # Translation files
├── layouts/             # HTML templates
│   ├── _default/        # Default layouts
│   │   └── list.html    # D3.js chart implementation
│   └── partials/        # Reusable components
├── static/              # Static assets
│   ├── css/             # Stylesheets
│   ├── js/              # JavaScript
│   │   ├── default.js   # Site functionality
│   │   ├── stacked_ordinal_ratio.js  # D3.js chart function
│   │   └── translations.js  # i18n support
│   └── images/          # Images
├── hugo.toml            # Hugo configuration
└── Makefile             # Build commands
```

## 📊 D3.js Chart Implementation

### Data Format

The chart expects JSON data in the following format:

```json
[
  {
    "id": "1-1-0",           // Category identifier
    "stack_id": "1-1-0-1",   // Stack series identifier
    "year": "AY2023",        // Time period
    "total": 10,             // Total responses
    "answers": 2,            // Responses for this category
    "selection": "1"         // Rating value (1-5)
  }
]
```

## 🔧 Configuration

### Chart Settings

Configure the D3.js chart in `layouts/_default/list.html`:

- **Data Source**: Change `d3.json("data.json")` to point to your data file
- **Chart Dimensions**: Modify `width` and `height` parameters
- **Color Scheme**: Update `colors: d3.schemeSpectral[5]` for different palettes
- **Y-axis Format**: Change `yFormat: d3.format(".0%")` for different number formats
- **Tooltip Content**: Customize the `title` function for tooltip information

### Content Settings

Each content file supports:

- Front matter metadata
- AsciiDoc formatting
- Hugo shortcodes
- Custom parameters
- JSON data for D3.js visualizations

## 📄 License

Unless otherwise specified, the following license applies.

    Copyright 2024 Yasuhiro ABE <yasu@yasundial.org>

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

### D3.js License Terms

The d3.js library is licensed under the ISC License.

The `stacked_ordinal_ratio.js` function is based on the original stacked bar chart example and follows the same licensing terms.

## 🛠️ Development Process & Tooling

This project leverages Generative AI as a development assistant. Its primary roles included:

* Assisting in writing documentation and comments.
* Refactoring and optimizing existing code blocks.
* Debugging and suggesting potential solutions to issues.

All AI-generated code has been reviewed and validated by the author to ensure it aligns with the project's goals and quality standards.

