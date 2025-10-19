
# Hugo i18n Site Template

A modern, multilingual Hugo site template with accessibility features, dark mode support, and responsive design.

## 🌟 Features

- **Multilingual Support**: Japanese and English with easy language switching
- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **Dark Mode**: Automatic theme detection with manual toggle
- **Accessibility**: WCAG 2.1 compliant with keyboard navigation and screen reader support
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Search Functionality**: Built-in search with instant results
- **Performance Optimized**: Fast loading with optimized assets
- **SEO Ready**: Meta tags, Open Graph, and structured data
- **AsciiDoc Support**: Rich content authoring with AsciiDoc

## 🚀 Quick Start

### Prerequisites

- [Hugo Extended](https://gohugo.io/installation/) (v0.100.0 or later)
- [AsciiDoctor](https://asciidoctor.org/) (for AsciiDoc support)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/hugo-i18nsite-template.git
   cd hugo-i18nsite-template
   ```

2. Install dependencies (optional):
   ```bash
   make install
   ```

3. Start the development server:
   ```bash
   make dev
   ```

4. Open your browser to `http://localhost:1313`

### Building for Production

```bash
make production
```

## 📁 Project Structure

```
hugo-i18nsite-template/
├── archetypes/          # Content templates
├── content/             # Site content
│   ├── _index.ja.adoc   # Japanese homepage
│   ├── _index.en.adoc   # English homepage
│   ├── profile/         # Profile pages
│   ├── activities/      # Activities pages
│   └── contact/         # Contact pages
├── data/                # Data files
│   ├── ja/              # Japanese data
│   └── en/              # English data
├── i18n/                # Translation files
├── layouts/             # HTML templates
│   ├── _default/        # Default layouts
│   └── partials/        # Reusable components
├── static/              # Static assets
│   ├── css/             # Stylesheets
│   ├── js/              # JavaScript
│   └── images/          # Images
├── hugo.toml            # Hugo configuration
└── Makefile             # Build commands
```

## 🎨 Customization

### Adding New Languages

1. Add language configuration to `hugo.toml`:
   ```toml
   [languages.ko]
     languageName = "한국어"
     languageCode = "ko"
     weight = 3
     contentDir = "content"
     [languages.ko.params]
       site_description = "다국어 Hugo 사이트 템플릿"
   ```

2. Create translation file `i18n/ko.toml`
3. Create content directory `content/` with `.ko.adoc` files
4. Add menu data in `data/ko/menu/nav_header.yaml`

### Styling

The template uses CSS custom properties for easy theming. Edit `static/css/default.css`:

```css
:root {
  --primary-color: #2c3e50;
  --secondary-color: #3498db;
  --accent-color: #e74c3c;
  /* ... more variables */
}
```

### Content Management

- **Homepage**: Edit `content/_index.{lang}.adoc`
- **Profile**: Edit `content/profile/_index.{lang}.adoc`
- **Activities**: Edit `content/activities/_index.{lang}.adoc`
- **Contact**: Edit `content/contact/_index.{lang}.adoc`

## 🛠️ Development

### Available Commands

```bash
make help          # Show all available commands
make dev           # Start development server
make build         # Build for production
make clean         # Clean build artifacts
make lint          # Lint CSS and JavaScript
make format        # Format code
make test          # Run tests
```

### Adding New Features

1. **New Pages**: Create content files in appropriate language directories
2. **New Layouts**: Add templates in `layouts/` directory
3. **New Styles**: Add CSS in `static/css/` directory
4. **New Scripts**: Add JavaScript in `static/js/` directory

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## ♿ Accessibility

This template follows WCAG 2.1 AA guidelines:

- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- High contrast support
- Focus management
- Skip links for navigation

## 🔧 Configuration

### Site Settings

Edit `hugo.toml` to configure:

- Site title and description
- Language settings
- Menu structure
- Social media links
- Analytics (Google Analytics)
- Search settings

### Content Settings

Each content file supports:

- Front matter metadata
- AsciiDoc formatting
- Hugo shortcodes
- Custom parameters

## 📄 License

Copyright 2024 Your Name. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/hugo-i18nsite-template/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/hugo-i18nsite-template/discussions)
- **Email**: your.email@example.com

## 🙏 Acknowledgments

- [Hugo](https://gohugo.io/) - Static site generator
- [AsciiDoc](https://asciidoctor.org/) - Content authoring
- [Modern Normalize](https://github.com/sindresorhus/modern-normalize) - CSS reset
- [Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP) - Web font


