# ngx-custom-tooltip

Monorepo for the development of the **ngx-custom-tooltip** library - A simple and customizable tooltip/pop-up component for Angular projects.

## 📁 Project Structure

This is an Angular workspace that contains:

- **`projects/ngx-custom-tooltip/`** - Library source code
- **`projects/demo-app/`** - Demo application to test the library

## 🚀 Prerequisites

- Node.js (recommended: 16.x or higher)
- npm
- Angular CLI

## 🛠️ Development Environment Setup

**1. Clone the repository:**

```bash
git clone https://github.com/valdefreaks/ngx-custom-tooltip.git
cd ngx-custom-tooltip
```

**2. Install dependencies:**

```bash
npm install
```

## 📦 Available Scripts

### Development

```bash
# Start the demo application
npm start

# The application will be available at http://localhost:4200
```

### Build

```bash
# Build the library in production mode
npm run build:lib

# The output will be in dist/ngx-custom-tooltip/
```

### Testing

```bash
# Run library tests
npm test
```

### Linting and Formatting

```bash
# Analyze TypeScript and HTML code
npm run lint

# Automatically fix linting issues
npm run lint:fix

# Analyze and fix CSS files
npm run lint:css

# Format code with Prettier
npm run format
```

### Publishing

```bash
# Package the library locally
npm run pack:lib

# Build and publish to npm (requires permissions)
npm run publish:lib
```

## 🏗️ Library Development

The library is located in `projects/ngx-custom-tooltip/`. To develop:

1. Make changes to the library source code
2. Run `npm run build:lib` to build
3. Test changes in the demo app with `npm start`

## 📝 Quality Control

This project uses:

- **ESLint** - For static analysis of TypeScript/JavaScript code
- **Stylelint** - For CSS style validation
- **Prettier** - For consistent code formatting
- **Husky + lint-staged** - For automatic pre-commit validation

Git hooks are configured automatically when installing dependencies.

## 🔗 Links

- **User Documentation**: See [Library README](./projects/ngx-custom-tooltip/README.md)
- **Issues**: [GitHub Issues](https://github.com/valdefreaks/ngx-custom-tooltip/issues)
- **NPM Package**: [ngx-custom-tooltip](https://www.npmjs.com/package/ngx-custom-tooltip)

## 📄 Compatibility

| NgxCustomTooltip | Angular           |
|------------------|-------------------|
| 0.x.x            | ^9.0.0            |
| 1.x.x            | => 9.0.0 < 14.0.0 |
| 2.x.x            | ^14.0.0           |

## 🐛 Report Issues

If you find any issues or have suggestions for improvement, please report them [here.](https://github.com/valdefreaks/ngx-custom-tooltip/issues)

When reporting an issue, include:
- Clear description of the problem
- Angular and library version you're using
- Steps to reproduce the issue
- Expected behavior vs actual behavior
- Screenshots or code examples if possible

## 📜 License

This project is under the MIT license. See the LICENSE file for more details.

## 👤 Author

**Valdemar Farina**

- GitHub: [@valdefreaks](https://github.com/valdefreaks)
