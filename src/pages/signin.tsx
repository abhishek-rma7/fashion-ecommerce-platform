import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import SubscriptionWithBg from "@components/common/subscription-with-bg";
import LoginForm from "@components/auth/login-form";
import PageHeader from "@components/ui/page-header";

export default function SignInPage() {
  return (
    <>
      <PageHeader pageHeader="Sign In" />
      <Container>
        <div className="py-16 lg:py-20">
          <LoginForm />
        </div>
        <SubscriptionWithBg />
      </Container>
    </>
  );
}

SignInPage.Layout = Layout;
