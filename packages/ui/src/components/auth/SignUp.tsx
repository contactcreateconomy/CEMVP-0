"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpSchema, type SignUpInput } from "@createconomy/utils/validation";
import { getTenantFromHostname } from "@createconomy/utils/tenant";
import { useSignUp } from "@createconomy/convex/hooks";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "../../lib/utils";

// Local type definition to avoid import issues
interface AuthResult {
  success: boolean;
  userId?: string;
  sessionId?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
    image?: string;
  };
  error?: string;
}

interface SignUpProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  signInHref?: string;
  className?: string;
}

export function SignUp({
  onSuccess,
  onError,
  signInHref = "/signin",
  className,
}: SignUpProps = {}) {
  const router = useRouter();
  const signUp = useSignUp();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<SignUpInput>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof SignUpInput, string>>>({});

  const validateField = (name: keyof SignUpInput, value: string) => {
    const result = signUpSchema.safeParse({ ...formData, [name]: value });
    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors[name]?.[0];
      return fieldError || null;
    }
    return null;
  };

  const handleInputChange = (name: keyof SignUpInput, value: string) => {
    setFormData((prev: SignUpInput) => ({ ...prev, [name]: value }));
    const fieldError = validateField(name, value);
    setFieldErrors((prev) => ({ ...prev, [name]: fieldError || undefined }));
    setError(null);
  };

  const getTenantDomain = (): string => {
    if (typeof window === "undefined") {
      return "marketplace"; // Default for SSR
    }
    const domain = getTenantFromHostname(window.location.hostname);
    return domain || "marketplace";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const result = signUpSchema.safeParse(formData);
    if (!result.success) {
      const errors: Partial<Record<keyof SignUpInput, string>> = {};
      for (const [fieldName, errorList] of Object.entries(result.error.formErrors.fieldErrors)) {
        if (fieldName && errorList) {
          errors[fieldName as keyof SignUpInput] = errorList[0] || "Invalid value";
        }
      }
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Use the signUp hook
      const tenantDomain = getTenantDomain();
      const authResult: AuthResult = await signUp(tenantDomain, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (authResult.success) {
        onSuccess?.();
        router.push("/");
        router.refresh();
      } else {
        const errorMessage = authResult.error || "Sign up failed";
        setError(errorMessage);
        onError?.(errorMessage);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Sign up failed";
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "flex min-h-screen bg-[#262D34]",
        className
      )}
    >
      {/* Left Panel - Info */}
      <div className="hidden md:flex w-1/2 bg-[#1E252B] flex-col justify-center items-center p-12">
        <div className="max-w-md space-y-10">
          <h2 className="text-[30px] font-bold leading-tight text-[#F7F7F7]">
            Join a thriving community of entrepreneurs and developers.
          </h2>

          <div className="space-y-5">
            {/* Info Cards */}
            {["Connect with peers", "Share knowledge", "Grow together"].map((text, index) => (
              <div
                key={index}
                className="bg-[#262D34] p-5 rounded-lg"
              >
                <p className="text-[#F7F7F7] font-medium">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Sign Up Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12 bg-[#262D34]">
        {/* Logo */}
        <div className="mb-10 flex items-center gap-2.5">
          <div className="w-[22px] h-[22px] bg-[#F7F7F7] rounded-md p-[3px]">
            {/* Simple H icon */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-4 h-5 bg-[#262D34] rounded-sm" />
            </div>
          </div>
          <span className="text-[26px] font-bold leading-[38px] text-[#FF8F67]">
            Hipnode.
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-[420px] space-y-[29px]">
          {error && (
            <div className="p-3 text-sm text-red-400 bg-red-950/50 border border-red-800 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#F7F7F7]">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                disabled={isLoading}
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={cn(
                  "bg-[#2C353D] border-[#3F4354] text-[#F7F7F7] placeholder:text-[#8A92A6]",
                  fieldErrors.name && "border-red-500"
                )}
              />
              {fieldErrors.name && (
                <p className="text-sm text-red-400">{fieldErrors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#F7F7F7]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                disabled={isLoading}
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={cn(
                  "bg-[#2C353D] border-[#3F4354] text-[#F7F7F7] placeholder:text-[#8A92A6]",
                  fieldErrors.email && "border-red-500"
                )}
              />
              {fieldErrors.email && (
                <p className="text-sm text-red-400">{fieldErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#F7F7F7]">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                disabled={isLoading}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={cn(
                  "bg-[#2C353D] border-[#3F4354] text-[#F7F7F7] placeholder:text-[#8A92A6]",
                  fieldErrors.password && "border-red-500"
                )}
              />
              {fieldErrors.password && (
                <p className="text-sm text-red-400">{fieldErrors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[#F7F7F7]">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                disabled={isLoading}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className={cn(
                  "bg-[#2C353D] border-[#3F4354] text-[#F7F7F7] placeholder:text-[#8A92A6]",
                  fieldErrors.confirmPassword && "border-red-500"
                )}
              />
              {fieldErrors.confirmPassword && (
                <p className="text-sm text-red-400">{fieldErrors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Sign Up Button */}
          <Button
            type="submit"
            className="w-full bg-[#FF8F67] hover:bg-[#FF8F67]/90 text-white py-2.5 px-10 rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </Button>

          {/* Sign In Link */}
          <p className="text-center text-sm text-[#F7F7F7]">
            Already have an account?{" "}
            <a
              href={signInHref}
              className="text-[#FF8F67] font-medium hover:underline"
            >
              Sign in
            </a>
          </p>

          {/* Divider */}
          <div className="flex items-center gap-5">
            <div className="h-px w-[180px] bg-[#3F4354]" />
            <span className="text-[18px] font-semibold leading-[26px] text-[#F7F7F7]">
              or
            </span>
            <div className="h-px w-[180px] bg-[#3F4354]" />
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            {["Continue with Google", "Continue with GitHub", "Continue with Apple"].map(
              (label) => (
                <Button
                  key={label}
                  type="button"
                  variant="outline"
                  className="w-full bg-[#2C353D] border-[#3F4354] text-[#F7F7F7] hover:bg-[#2C353D]/80 hover:border-[#3F4354] py-3 px-[119px] rounded-lg justify-center"
                  disabled={isLoading}
                >
                  {label}
                </Button>
              )
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
