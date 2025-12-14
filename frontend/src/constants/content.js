
export const LOGO_URL = "../../public/smart-logo.png"; 

export const content = {

  navLinks: [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about" },
    { title: "Contact", path: "/contact" },
  ],
 
  footerLinks: [
    { title: "Privacy Policy", path: "/privacy-policy" },
    { title: "Terms & Conditions", path: "/terms-and-conditions" },
  ],
 
  home: {
    hero: {
      title: "Cleanliness is the new beginning.",
      subtitle:
        "Welcome to SmartPeepal, the official platform for managing waste responsibly. Report issues, schedule pickups, and help us build a cleaner, greener community.",
  
      buttons: [
        { title: "Report an Issue", path: "/dashboard#file-complaint", primary: true },
        { title: "About Us", path: "/about", primary: false },
        { title: "Contact Us", path: "/contact", primary: false },
      ]
    },
    whatWhy: {
      title: "What is SmartPeepal?",
      what: "SmartPeepal is an integrated digital platform designed to connect the public directly with waste management services. It's a single point of contact for all your waste-related needs, from daily garbage collection to reporting hazardous materials.",
      why: "Our mission is to create transparency and accountability. By replacing scattered complaint systems with one intelligent platform, we reduce resolution times, optimize collection routes, and empower citizens to be active participants in their community's health."
    },
    howToUse: {
      title: "How It Works",
      steps: [
        { name: "1. Register", desc: "Create an account as a Citizen or Organisation to get started." },
        { name: "2. Report or Request", desc: "File a complaint for an overflowing bin or request a special pickup for e-waste." },
        { name: "3. We Assign", desc: "Our system instantly routes your request to the nearest available Collector." },
        { name: "4. Track & Resolve", desc: "Track the status of your report in real-time from your personal dashboard." },
      ]
    },
    wasteTypes: {
      title: "Know Your Waste",
      types: [
        { name: "e-Waste", img: "../../../../public/ewaste.jpg", desc: "Old electronics like phones, chargers, and laptops. Never throw in regular bins." },
        { name: "Medical Waste", img: "../../../../public/med.jpeg", desc: "Syringes, expired medicine, and bandages. Must be handled by professionals." },
        { name: "Harmful Waste", img: "../../../../public/harm.jpeg", desc: "Includes batteries, paint cans, and chemical cleaners. Requires special disposal." },
        { name: "Wet Waste", img: "../../../../public/wet.jpg", desc: "Kitchen scraps like vegetable peels, fruit, and leftover food. Great for composting." },
        { name: "Dry Waste", img: "/../../../../public/dry.jpg", desc: "Paper, plastic, glass, and metal. Can be recycled if cleaned and segregated." },
        { name: "General Waste", img: "../../../../public/img-any.jpg", desc: "Items that cannot be recycled or composted, like wrappers or sanitary products." },
      ]
    }
  },
 
  about: {
    title: "Our Mission: A Cleaner Tomorrow",
    text: "SmartPeepal was born from a simple idea: waste management should be easy, transparent, and effective. We believe that technology can bridge the gap between citizens who care and the services designed to help them. By providing real-time data and clear communication channels, we are not just cleaning streets—we are building trust and fostering a sustainable future for everyone."
  },
 
  contact: {
    title: "Get In Touch",
    text: "Have a question or need to speak with our team? We are here to help. You can reach our main office during business hours.",
    details: [
      { name: "Phone", value: "+91 (123) 456-7890" },
      { name: "Email", value: "support@smartpeepal.gov" },
      { name: "Address", value: "Municipal Corporation, Chhatrapati Sambhajinagar" }
    ]
  },
};