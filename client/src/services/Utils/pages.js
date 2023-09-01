const pages = new Map();

// general pages

pages.set('home', { name: 'Home', path: '/'});
pages.set('login', { name: 'Log In', path: '/login'});
pages.set('signup', { name: 'Sign Up', path: '/signup'});
pages.set('forgot-password', { name: 'Forgot your password?', path: '/forgot-password'});

pages.set('find-talent', { name: 'Find Talent', path: '/find-talent', isHeader: true});
pages.set('find-work', { name: 'Find Work', path: '/find-work', isHeader: true});
pages.set('why-gigmate', { name: 'Why GigMate', path: '/why-gigmate', isHeader: true});

// data for client pages in the sidebar

pages.set('client-home', { name: 'Home', path: '/', isClient: true});
pages.set('local-talent', { name: 'Local Talent', path: '/local-talent', isClient: true});
pages.set('bookmarks', { name: 'Bookmarks', path: '/bookmarks', isClient: true});
pages.set('recently-viewed', { name: 'Recently Viewed', path: '/recently-viewed', isClient: true, subMenu : true});
pages.set('your-hires', { name: 'Your Hires', path: '/your-hires', isClient: true,  subMenu : true});
pages.set('rising-stars', { name: 'Rising Stars', path: '/rising-stars', isClient: true,  subMenu : true});
pages.set('post-job', { name: 'Post a Job', path: '/post-job', isClient: true});
pages.set('chat', { name: 'Chat', path: '/chat', isClient: true});
pages.set('settings', { name: 'Settings', path: '/settings', isClient: true});

// data for pages in the footer

pages.set('about-us', { name: 'About Us', path: '/about-us', isFooter: true});
pages.set('how-to-hire', { name: 'How to Hire', path: '/how-to-hire', isFooter: true});
pages.set('how-to-work', { name: 'How to Work', path: '/how-to-work', isFooter: true});
pages.set('blogs', { name: 'Blogs', path: '/blogs', isFooter: true});
pages.set('careers', { name: 'Careers', path: '/careers', isFooter: true});
pages.set('contact-us', { name: 'Contact Us', path: '/contact-us', isFooter: true});

// data for pages of legal stuff

pages.set('terms-of-service', { name: 'Terms of Servce', path: '/terms-of-service', isLegal: true});
pages.set('privacy-policy', { name: 'Privacy Policy', path: '/privacy-policy', isLegal: true});
pages.set('safety-security', { name: 'Safety & Security', path: '/safety-security', isLegal: true});

export default pages;