// SEO Validation and Testing Utilities

export interface SEOValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  score: number;
}

export function validateSEOMetadata(metadata: {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
}): SEOValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  let score = 100;

  // Title validation
  if (!metadata.title) {
    errors.push("Title is required");
    score -= 20;
  } else {
    if (metadata.title.length < 30) {
      warnings.push("Title is too short (recommended: 30-60 characters)");
      score -= 5;
    }
    if (metadata.title.length > 60) {
      warnings.push("Title is too long (recommended: 30-60 characters)");
      score -= 5;
    }
    if (!metadata.title.includes("NextTekno")) {
      warnings.push("Title should include brand name");
      score -= 3;
    }
  }

  // Description validation
  if (!metadata.description) {
    errors.push("Description is required");
    score -= 20;
  } else {
    if (metadata.description.length < 120) {
      warnings.push("Description is too short (recommended: 120-160 characters)");
      score -= 5;
    }
    if (metadata.description.length > 160) {
      warnings.push("Description is too long (recommended: 120-160 characters)");
      score -= 5;
    }
  }

  // Keywords validation
  if (!metadata.keywords || metadata.keywords.length === 0) {
    warnings.push("Keywords are recommended for better SEO");
    score -= 5;
  } else {
    if (metadata.keywords.length > 10) {
      warnings.push("Too many keywords (recommended: 5-10 keywords)");
      score -= 3;
    }
  }

  // Canonical URL validation
  if (metadata.canonical) {
    if (!metadata.canonical.startsWith('/')) {
      errors.push("Canonical URL should start with '/'");
      score -= 10;
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    score: Math.max(0, score)
  };
}

export function validateStructuredData(data: any): SEOValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  let score = 100;

  if (!data) {
    errors.push("Structured data is required");
    return { isValid: false, errors, warnings, score: 0 };
  }

  // Check required fields
  if (!data["@context"]) {
    errors.push("@context is required in structured data");
    score -= 20;
  }

  if (!data["@type"]) {
    errors.push("@type is required in structured data");
    score -= 20;
  }

  // Validate specific types
  if (data["@type"] === "Product") {
    if (!data.name) {
      errors.push("Product name is required");
      score -= 15;
    }
    if (!data.offers) {
      errors.push("Product offers are required");
      score -= 15;
    }
    if (!data.image) {
      warnings.push("Product image is recommended");
      score -= 5;
    }
  }

  if (data["@type"] === "Organization") {
    if (!data.name) {
      errors.push("Organization name is required");
      score -= 15;
    }
    if (!data.url) {
      errors.push("Organization URL is required");
      score -= 15;
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    score: Math.max(0, score)
  };
}

export function generateSEOReport(pageData: {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  structuredData?: any[];
  images?: string[];
  links?: string[];
}): {
  overall: SEOValidationResult;
  metadata: SEOValidationResult;
  structuredData: SEOValidationResult[];
  recommendations: string[];
} {
  const metadataResult = validateSEOMetadata(pageData);
  const structuredDataResults = pageData.structuredData?.map(validateStructuredData) || [];
  
  const recommendations: string[] = [];
  
  // Generate recommendations based on validation results
  if (metadataResult.score < 80) {
    recommendations.push("Improve page metadata (title, description, keywords)");
  }
  
  if (structuredDataResults.some(result => result.score < 80)) {
    recommendations.push("Fix structured data issues");
  }
  
  if (!pageData.images || pageData.images.length === 0) {
    recommendations.push("Add relevant images with alt text");
  }
  
  if (!pageData.canonical) {
    recommendations.push("Add canonical URL to prevent duplicate content");
  }
  
  // Calculate overall score
  const overallScore = Math.round(
    (metadataResult.score + 
     (structuredDataResults.reduce((sum, result) => sum + result.score, 0) / Math.max(1, structuredDataResults.length))
    ) / 2
  );
  
  const overallErrors = [
    ...metadataResult.errors,
    ...structuredDataResults.flatMap(result => result.errors)
  ];
  
  const overallWarnings = [
    ...metadataResult.warnings,
    ...structuredDataResults.flatMap(result => result.warnings)
  ];

  return {
    overall: {
      isValid: overallErrors.length === 0,
      errors: overallErrors,
      warnings: overallWarnings,
      score: overallScore
    },
    metadata: metadataResult,
    structuredData: structuredDataResults,
    recommendations
  };
}

// SEO Testing Utilities
export const seoTestUrls = {
  googleStructuredDataTesting: (url: string) => 
    `https://search.google.com/test/rich-results?url=${encodeURIComponent(url)}`,
  googlePageSpeedInsights: (url: string) => 
    `https://pagespeed.web.dev/report?url=${encodeURIComponent(url)}`,
  facebookDebugger: (url: string) => 
    `https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(url)}`,
  twitterCardValidator: (url: string) => 
    `https://cards-dev.twitter.com/validator?url=${encodeURIComponent(url)}`,
  linkedinPostInspector: (url: string) => 
    `https://www.linkedin.com/post-inspector/inspect/${encodeURIComponent(url)}`
};

export function logSEOReport(report: ReturnType<typeof generateSEOReport>) {
  console.group("🔍 SEO Report");
  console.log(`Overall Score: ${report.overall.score}/100`);
  
  if (report.overall.errors.length > 0) {
    console.group("❌ Errors");
    report.overall.errors.forEach(error => console.error(error));
    console.groupEnd();
  }
  
  if (report.overall.warnings.length > 0) {
    console.group("⚠️ Warnings");
    report.overall.warnings.forEach(warning => console.warn(warning));
    console.groupEnd();
  }
  
  if (report.recommendations.length > 0) {
    console.group("💡 Recommendations");
    report.recommendations.forEach(rec => console.info(rec));
    console.groupEnd();
  }
  
  console.groupEnd();
}