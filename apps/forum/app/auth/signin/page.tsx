import { SignInForm } from "@/components/auth/signin-form";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f0f0] p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-[#1E252B] p-8 shadow-2xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Hipnode</h2>
          <p className="text-gray-400">Sign in to your account</p>
        </div>
        <SignInForm />
      </div>
    </div>
  );
}
