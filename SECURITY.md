# Security Policy

## Supported Versions

This security policy applies to the portfolio website and all published versions.

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |
| < Latest| :x:                |

## Security Practices

### Frontend Security
- **Dependency Management**: Regular updates via Dependabot
- **Code Quality**: ESLint for static analysis, no console.error in production
- **Input Validation**: All user inputs validated before processing
- **Storage**: Sensitive data never stored in localStorage
- **Third-party Services**: Three.js loaded with integrity checks

### Build Security
- **Source Maps**: Disabled in production builds
- **Dependencies**: Audited via `npm audit` regularly
- **Bundle Scanning**: Checked for known vulnerabilities

### Deployment Security
- **HTTPS Only**: All traffic encrypted
- **GitHub Pages**: Leverages GitHub's security infrastructure
- **Branch Protection**: Main branch protected, PRs required for changes
- **Secrets Management**: No credentials in version control

## Reporting a Vulnerability

If you discover a security vulnerability in this portfolio:

1. **Do NOT** open a public GitHub issue
2. **Email** security concerns to: mohammad.newaz1@northsouth.edu
3. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Response Timeline
- **Acknowledgment**: Within 48 hours
- **Assessment**: Within 1 week
- **Patch/Mitigation**: As soon as practical
- **Disclosure**: After fix is deployed

## Security Standards

- **OWASP Top 10**: Aligned with current standards
- **Content Security Policy**: Implemented to prevent XSS
- **No Tracking/Analytics**: Unless explicitly enabled by user
- **Privacy**: No personal data collection beyond what's necessary

## Dependencies

All dependencies are listed in `package.json`. Security updates are applied automatically via Dependabot.

### Current Security Tools
- ESLint: Code quality and potential security issues
- npm audit: Dependency vulnerability scanning
- GitHub Security Alerts: Automated scanning

---

For questions or concerns, contact: mohammad.newaz1@northsouth.edu

