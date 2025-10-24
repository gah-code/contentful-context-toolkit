# 🧩 Contentful Schema Documentation (with Field Types)

Generated on: 10/24/2025, 1:18:24 AM

This document includes field names and their corresponding types extracted from your Contentful GraphQL schema.

---

## BlogPost
**Entries fetched:** 3

**Fields:**
- _id: ID
- author: Entry
- body: BlogPostBody
- category: String
- contentfulMetadata: ContentfulMetadata
- date: DateTime
- excerpt: String
- image: Asset
- linkedFrom: BlogPostLinkingCollections
- seoDescription: String
- seoTitle: String
- slug: String
- sys: Sys
- title: String

---

## Homepage
**Entries fetched:** 1

**Fields:**
- _id: ID
- contentCollection: HomepageContentCollection
- contentfulMetadata: ContentfulMetadata
- description: String
- image: Asset
- linkedFrom: HomepageLinkingCollections
- sys: Sys
- title: String

---

## HomepageBenefit
**Entries fetched:** 3

**Fields:**
- _id: ID
- contentfulMetadata: ContentfulMetadata
- heading: String
- image: Asset
- linkedFrom: HomepageBenefitLinkingCollections
- sys: Sys
- text: String

---

## HomepageBenefitList
**Entries fetched:** 2

**Fields:**
- _id: ID
- contentCollection: HomepageBenefitListContentCollection
- contentfulMetadata: ContentfulMetadata
- heading: String
- linkedFrom: HomepageBenefitListLinkingCollections
- sys: Sys
- text: String

---

## HomepageCta
**Entries fetched:** 2

**Fields:**
- _id: ID
- contentfulMetadata: ContentfulMetadata
- heading: String
- image: Asset
- kicker: String
- linkedFrom: HomepageCtaLinkingCollections
- linksCollection: HomepageCtaLinksCollection
- sys: Sys
- text: String

---

## HomepageFeature
**Entries fetched:** 3

**Fields:**
- _id: ID
- contentfulMetadata: ContentfulMetadata
- heading: String
- image: Asset
- kicker: String
- linkedFrom: HomepageFeatureLinkingCollections
- linksCollection: HomepageFeatureLinksCollection
- sys: Sys
- text: String

---

## HomepageFeatureList
**Entries fetched:** 1

**Fields:**
- _id: ID
- contentCollection: HomepageFeatureListContentCollection
- contentfulMetadata: ContentfulMetadata
- heading: String
- kicker: String
- linkedFrom: HomepageFeatureListLinkingCollections
- sys: Sys
- text: String

---

## HomepageHero
**Entries fetched:** 1

**Fields:**
- _id: ID
- contentfulMetadata: ContentfulMetadata
- heading: String
- image: Asset
- kicker: String
- linkedFrom: HomepageHeroLinkingCollections
- linksCollection: HomepageHeroLinksCollection
- subhead: String
- sys: Sys
- text: String

---

## HomepageLink
**Entries fetched:** 3

**Fields:**
- _id: ID
- contentfulMetadata: ContentfulMetadata
- href: String
- linkedFrom: HomepageLinkLinkingCollections
- sys: Sys
- text: String

---

## HomepageLinkGroup
**Entries fetched:** 1

**Fields:**
- _id: ID
- contentfulMetadata: ContentfulMetadata
- linkedFrom: HomepageLinkGroupLinkingCollections
- linksCollection: HomepageLinkGroupLinksCollection
- name: String
- sys: Sys

---

## HomepageLogo
**Entries fetched:** 3

**Fields:**
- _id: ID
- alt: String
- contentfulMetadata: ContentfulMetadata
- image: Asset
- linkedFrom: HomepageLogoLinkingCollections
- sys: Sys

---

## HomepageLogoList
**Entries fetched:** 1

**Fields:**
- _id: ID
- contentfulMetadata: ContentfulMetadata
- linkedFrom: HomepageLogoListLinkingCollections
- logosCollection: HomepageLogoListLogosCollection
- name: String
- sys: Sys
- text: String

---

## HomepageProduct
**Entries fetched:** 3

**Fields:**
- _id: ID
- contentfulMetadata: ContentfulMetadata
- heading: String
- image: Asset
- linkedFrom: HomepageProductLinkingCollections
- linksCollection: HomepageProductLinksCollection
- sys: Sys
- text: String

---

## HomepageProductList
**Entries fetched:** 1

**Fields:**
- _id: ID
- contentCollection: HomepageProductListContentCollection
- contentfulMetadata: ContentfulMetadata
- heading: String
- kicker: String
- linkedFrom: HomepageProductListLinkingCollections
- sys: Sys
- text: String

---

## HomepageTestimonial
**Entries fetched:** 3

**Fields:**
- _id: ID
- avatar: Asset
- contentfulMetadata: ContentfulMetadata
- linkedFrom: HomepageTestimonialLinkingCollections
- quote: String
- source: String
- sys: Sys

---

## HomepageTestimonialList
**Entries fetched:** 1

**Fields:**
- _id: ID
- contentCollection: HomepageTestimonialListContentCollection
- contentfulMetadata: ContentfulMetadata
- heading: String
- kicker: String
- linkedFrom: HomepageTestimonialListLinkingCollections
- sys: Sys

---

## Layout
**Entries fetched:** 1

**Fields:**
- _id: ID
- contentfulMetadata: ContentfulMetadata
- footer: LayoutFooter
- header: LayoutHeader
- linkedFrom: LayoutLinkingCollections
- name: String
- sys: Sys

---

## LayoutFooter
**Entries fetched:** 1

**Fields:**
- _id: ID
- contentfulMetadata: ContentfulMetadata
- copyright: String
- linkedFrom: LayoutFooterLinkingCollections
- linksCollection: LayoutFooterLinksCollection
- metaCollection: LayoutFooterMetaCollection
- name: String
- socialLinksCollection: LayoutFooterSocialLinksCollection
- sys: Sys

---

## LayoutHeader
**Entries fetched:** 1

**Fields:**
- _id: ID
- contentfulMetadata: ContentfulMetadata
- cta: HomepageLink
- linkedFrom: LayoutHeaderLinkingCollections
- name: String
- navItemsCollection: LayoutHeaderNavItemsCollection
- sys: Sys

---

## NavItem
**Entries fetched:** 3

**Fields:**
- _id: ID
- contentfulMetadata: ContentfulMetadata
- description: String
- href: String
- icon: Asset
- linkedFrom: NavItemLinkingCollections
- sys: Sys
- text: String

---

## NavItemGroup
**Entries fetched:** 1

**Fields:**
- _id: ID
- contentfulMetadata: ContentfulMetadata
- linkedFrom: NavItemGroupLinkingCollections
- name: String
- navItemsCollection: NavItemGroupNavItemsCollection
- sys: Sys

---

## Note
**Entries fetched:** 3

**Fields:**
- _id: ID
- content: JSON
- contentBody: NoteContentBody
- contentfulMetadata: ContentfulMetadata
- description: String
- featured: Boolean
- image: Asset
- linkedFrom: NoteLinkingCollections
- seoDescription: String
- seoTitle: String
- slug: String
- sys: Sys
- title: String

---

## Page
**Entries fetched:** 3

**Fields:**
- _id: ID
- body: PageBody
- contentfulMetadata: ContentfulMetadata
- description: String
- image: Asset
- linkedFrom: PageLinkingCollections
- seoTitle: String
- slug: String
- sys: Sys
- title: String

---

## SocialLink
**Entries fetched:** 3

**Fields:**
- _id: ID
- contentfulMetadata: ContentfulMetadata
- linkedFrom: SocialLinkLinkingCollections
- service: String
- sys: Sys
- username: String

---
