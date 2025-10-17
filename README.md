# netlify-security-blocking-me-i-think-i-could-always-be-wrong

This is a small sub-selection of automated tests for my website, pointing at a Netlify branch deployment.

I started noticing all my tests were failing and there appear to be security prompts being shown to me instead of my website or static content.

1. This is a node repository, so you need Node 20+
1. `npm install`
1. `npm run test`

You should see several tests fail. The specifics are sporadic and unreliable. Could be Netlify is giving me a 403 response, or sometimes I'm getting a page that says `We are verifying your connection.` with a "Challenge ID" as an interstitial instead of my site's content.
