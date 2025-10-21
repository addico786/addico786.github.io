# 🔍 SEO Maintenance Guide for Adnan Khan's Portfolio

## 📋 **Quick Checklist - Update These When You:**

### ✅ **Get New Certifications**
**Files to update:** `index.html` (lines 97-152)

**What to do:**
1. Find the `"hasCredential"` section in the structured data
2. Copy an existing certification block
3. Change the name and organization
4. Example format:
```json
{
    "@type": "EducationalOccupationalCredential",
    "name": "YOUR NEW CERTIFICATION NAME",
    "credentialCategory": "certification",
    "recognizedBy": {
        "@type": "Organization",
        "name": "CERTIFYING ORGANIZATION"
    }
}
```

### ✅ **Learn New Skills/Technologies**
**Files to update:** `index.html` (lines 76-96)

**What to do:**
1. Find the `"knowsAbout"` array
2. Add new skills as strings
3. Keep them in alphabetical order
4. Example: `"New Technology",`

### ✅ **Add New Projects**
**Files to update:** `index.html` (projects section) + `sitemap.xml`

**What to do:**
1. Add project to your website normally
2. Update `sitemap.xml` if you create new pages
3. Consider updating meta description to mention new projects

### ✅ **Change Job Title or Experience**
**Files to update:** `index.html` (multiple places)

**What to do:**
1. Update the `title` tag (line 15)
2. Update `meta description` (line 24)  
3. Update `jobTitle` in structured data (line 62)
4. Update `description` in structured data (line 62)

### ✅ **Add Social Media Profiles**
**Files to update:** `index.html` (lines 71-75)

**What to do:**
1. Find the `"sameAs"` array
2. Add new social profile URLs
3. Example: `"https://twitter.com/yourusername",`

## 🛠️ **Step-by-Step Update Examples**

### Example 1: Adding a New AWS Certification
```json
// Add this to the hasCredential array:
{
    "@type": "EducationalOccupationalCredential",
    "name": "AWS Certified Solutions Architect",
    "credentialCategory": "certification",
    "recognizedBy": {
        "@type": "Organization",
        "name": "Amazon Web Services"
    }
}
```

### Example 2: Adding a New Skill (e.g., "Prometheus")
```json
// Add this to the knowsAbout array:
"Prometheus",
```

### Example 3: Updating Experience (3+ years)
```html
<!-- Update the meta description: -->
<meta name="description" content="Adnan Khan — DevOps Engineer with 3+ years experience. Expert in Terraform, Jenkins, Ansible, AWS, Kubernetes, CI/CD pipelines...">
```

## 🎯 **SEO Testing Tools**

### Test Your Structured Data:
1. Go to: https://search.google.com/test/rich-results
2. Enter your website URL
3. Check for any errors

### Test Your Social Sharing:
1. Go to: https://www.opengraph.xyz/
2. Enter your website URL
3. See how it looks on social media

### Submit to Google:
1. Go to: https://search.google.com/search-console
2. Add your website
3. Submit your sitemap: `https://addico786.github.io/sitemap.xml`

## 📅 **Regular Maintenance Schedule**

### Monthly:
- [ ] Check if you have new skills to add
- [ ] Update lastmod dates in sitemap.xml if you made changes

### When You Get New Certifications:
- [ ] Add to structured data
- [ ] Update meta description if it's a major certification
- [ ] Update keywords if it's a new technology

### When You Complete New Projects:
- [ ] Add project to your website
- [ ] Consider updating meta description
- [ ] Update sitemap if you create new pages

### Every 6 Months:
- [ ] Review and update meta description
- [ ] Check if your experience years need updating
- [ ] Test your SEO with the tools above

## 🚨 **Important Notes**

1. **Always test after changes:** Use the testing tools above
2. **Keep it consistent:** Don't mix different formats
3. **Don't overstuff keywords:** Keep it natural
4. **Update dates:** Change lastmod dates when you make changes
5. **Backup first:** Always backup before making changes

## 📞 **Need Help?**

If you're unsure about any changes:
1. Make a backup of your files first
2. Test changes locally if possible
3. Use the testing tools to verify everything works
4. Remember: small, consistent updates are better than big changes

---

**Last Updated:** January 27, 2025
**Next Review:** March 27, 2025
