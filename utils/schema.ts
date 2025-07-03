interface SchemaData {
  // Add any specific data fields you want to pass to the schema
}

export function generateSchemaMarkup(data?: SchemaData) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://rickmff.com/#person",
    "name": "Rickmff",
    "url": "https://rickmff.com",
    "sameAs": [
      // Add your social media profiles here if desired
    ],
    "jobTitle": "Developer",
    "description": "This is Rickmff Portfolio.",
    "image": {
      "@type": "ImageObject",
      "@id": "https://rickmff.com/#logo",
      "url": "https://rickmff.com/Hero.png",
      "contentUrl": "https://rickmff.com/Hero.png"
    }
  };
}