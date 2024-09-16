import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import SubscriptionWithBg from "@components/common/subscription-with-bg";
import PageHeader from "@components/ui/page-header";
import ContactForm from "@components/common/form/contact-form";
import ContactInfoBlock from "@containers/contact-info";
import ContactFormMain from "@components/contact/ContactForm";
import { NextSeo } from "next-seo";

export default function ContactUsPage() {
  return (
    <>
      <NextSeo
        title="Contact Us | CropOffs"
        description="Welcome to CropOffs. An upcycled jewellery brand started by a woman who has always loved fashion but wanted to make a difference."
      />
      <ContactFormMain />
    </>
  );
}

ContactUsPage.Layout = Layout;
