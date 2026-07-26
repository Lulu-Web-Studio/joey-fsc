const buildConfig = () => {

  const officePhone = "(203) 261-7800"
  const officeEmail = "office@facialsurgeryct.com"
  const officeAddress = "115 Technology Dr B-101, Trumbull, CT 06611"
  const googleReviewUrl = "https://g.page/r/CbgIr5TAtokHEAE/review"

  const name = process.env.NEXT_PUBLIC_DISPLAY_NAME || "Display Name.";
  const copyright = process.env.NEXT_PUBLIC_COPYRIGHT || "Copyright";
  const defaultTitle =
    process.env.NEXT_DEFAULT_METADATA_DEFAULT_TITLE || "Meta title";
  const defaultDescription = process.env.NEXT_PUBLIC_DESCRIPTION || "Description";

  return {
    officePhone,
    officeEmail,
    officeAddress,
    googleReviewUrl,
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    name: {
      name,
      copyright,
      metadata: {
        title: {
          absolute: defaultTitle,
          default: defaultTitle,
          template: `%s - ${defaultTitle}`,
        },
        description: defaultDescription,
      },
    },
    ogImageSecret:
      process.env.OG_IMAGE_SECRET ||
      "secret_used_for_signing_and_verifying_the_og_image_url",

  };
};

export const config = buildConfig();
