import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import ForgetPasswordForm from "@components/auth/forget-password-form";
import PageHeader from "@components/ui/page-header";
import SubscriptionWithBg from "@components/common/subscription-with-bg";

export default function ForgetPasswordPage() {
  return (
    <>
      <PageHeader pageHeader="Forget Password" />
      <Container>
        <div className="py-16 lg:py-20">
          <ForgetPasswordForm />
        </div>
        <SubscriptionWithBg />
      </Container>
    </>
  );
}

ForgetPasswordPage.Layout = Layout;
