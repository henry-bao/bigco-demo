# Google Login Check with Captcha

This React application checks if a visitor is logged into Google. If they are not logged in, the application will display a captcha to verify they are human before showing content.

## How It Works

The application uses an image loading technique to detect if a user is logged into Google. When a user is logged into Google, their browser will automatically load certain Google resources. If the user is not logged in, those resources will fail to load.

1. **Google Login Check**: Uses a hidden image to detect if the user is logged into Google
2. **Captcha Verification**: If not logged in, shows a Google reCAPTCHA to verify the user is human
3. **Content Access**: After verification (either Google login or captcha), the user can access content

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://your-repository-url/google-login-check.git
   cd google-login-check
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Get a Google reCAPTCHA v2 site key:
   - Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
   - Register a new site
   - Replace the test site key in `src/components/Captcha.tsx` with your actual site key

4. Start the development server:
   ```
   npm start
   ```

## Production Build

To create a production build:

```
npm run build
```

The build files will be in the `build` directory.

## Technical Notes

- This approach uses the same technique as social engineering attacks that detect if users are logged into services, but for legitimate purposes.
- The Google login detection is not 100% reliable and may change if Google updates their services.
- The test reCAPTCHA key provided will always pass verification. In production, replace it with a real key.

## Privacy Considerations

This application only detects login status and doesn't access any personal information from Google accounts. The detection is done entirely client-side.

## License

MIT
