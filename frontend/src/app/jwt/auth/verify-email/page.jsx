import { verifyEmailAction } from "@/actions/userActions";
import EmailVerificationResult from "@/components/Forms/EmailVerificationResult";
import styles from "./page.module.css";

export default async function EmailVerificationPage({ searchParams }) {
  const { token, expiry } = searchParams;
  const verificationResult = await verifyEmailAction(token, expiry);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Email Verification</h1>
      <EmailVerificationResult result={verificationResult} />
    </div>
  );
};