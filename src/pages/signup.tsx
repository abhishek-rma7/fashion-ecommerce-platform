import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import SignUpForm from "@components/auth/sign-up-form";
import PageHeader from "@components/ui/page-header";
import SubscriptionWithBg from "@components/common/subscription-with-bg";
import Stepper from "@components/auth/stepper";

export default function SignUpPage() {
  return (
    <>
      <Container>
        <div className="py-8 lg:py-16">
          <Stepper />
        </div>
        <SubscriptionWithBg />
      </Container>
    </>
  );
}

SignUpPage.Layout = Layout;
