# Contributing to Personal Portfolio

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Style Guidelines](#style-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project adheres to a code of conduct that all contributors are expected to follow. Please be respectful and constructive in all interactions.

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior vs actual behavior
- Screenshots (if applicable)
- Your browser and OS version

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- A clear and descriptive title
- Detailed description of the proposed enhancement
- Explanation of why this enhancement would be useful
- Examples of how it would work (if applicable)

### Contributing Code

1. **Bug Fixes**: Direct pull requests are welcome for bug fixes
2. **New Features**: Open an issue first to discuss the feature
3. **Documentation**: Documentation improvements are always appreciated

## Getting Started

1. **Fork the repository** to your GitHub account
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/mnxtr.github.io.git
   ```
3. **Add the upstream repository**:
   ```bash
   git remote add upstream https://github.com/mnxtr/mnxtr.github.io.git
   ```
4. **Create a new branch** for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

1. **Keep your fork up to date**:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Make your changes** in your feature branch

3. **Test your changes** thoroughly:
   - Open the HTML files in multiple browsers
   - Test responsive design on different screen sizes
   - Verify all links work correctly
   - Check for console errors

4. **Commit your changes** following the commit message guidelines

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** from your fork to the main repository

## Style Guidelines

### HTML

- Use semantic HTML5 elements
- Maintain proper indentation (2 spaces)
- Include appropriate ARIA labels for accessibility
- Add meaningful `alt` attributes to images
- Keep markup clean and organized

### CSS/TailwindCSS

- Use TailwindCSS utility classes when possible
- Keep custom CSS minimal
- Follow mobile-first responsive design principles
- Use consistent spacing and sizing
- Maintain the existing color scheme

### JavaScript

- Use modern ES6+ syntax
- Keep code modular and reusable
- Add comments for complex logic
- Handle errors gracefully
- Ensure cross-browser compatibility

### File Naming

- Use lowercase with hyphens for HTML files: `about-me.html`
- Use descriptive names for images: `project-screenshot.jpg`
- Keep filenames short but descriptive

## Commit Message Guidelines

Follow these conventions for commit messages:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no code change)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```
feat(projects): add new machine learning project

Add cardiovascular disease prediction project to the portfolio
with description, technologies, and external link.

Closes #123
```

```
fix(contact): correct email validation in contact form

The email validation was not properly checking for valid
email format. Updated the regex pattern to fix this.
```

```
docs(readme): update installation instructions

Added more detailed steps for Windows users and included
troubleshooting section.
```

## Pull Request Process

1. **Update documentation** if needed
   - Update README.md if you're adding features
   - Add comments to complex code

2. **Test thoroughly**
   - Test on multiple browsers (Chrome, Firefox, Safari, Edge)
   - Test responsive design on different devices
   - Verify all links and functionality work

3. **Ensure your PR**:
   - Has a clear title and description
   - References any related issues
   - Includes screenshots for visual changes
   - Doesn't include unnecessary files or changes

4. **PR Review Process**:
   - Maintainer will review your PR
   - Address any requested changes
   - Once approved, your PR will be merged

5. **After Merge**:
   - Delete your feature branch
   - Pull the latest changes from main
   - Your contribution will be live on GitHub Pages!

## Questions?

If you have questions or need help, feel free to:
- Open an issue for discussion
- Reach out via email: mohammad.newaz1@northsouth.edu

## Recognition

All contributors will be acknowledged in the project. Thank you for making this portfolio better! 🎉

---

Thank you for contributing! Your efforts help make this project better for everyone.
