import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Send, MessageSquare, Loader2, CheckCircle } from "lucide-react";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { PageContainer, PageContent } from "../../components/layout";

import { feedbackSchema } from "../../utils/feedbackValidationSchema";
import { feedbackService } from "../../services/feedbackService";
import { toast } from "sonner";
import { useState } from "react";

export default function FeedbackPage() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(feedbackSchema),
    defaultValues: {
      subject: "",
      message: "",
    },
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data) => {
    try {
      setError("");
      setSuccess(false);

      await feedbackService.submitFeedback(data);

      setSuccess(true);
      toast.success("Feedback submitted successfully!");
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.message || "Failed to submit feedback. Please try again.");
    }
  };

  return (
    <PageContainer>
      <PageContent maxWidth="2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <MessageSquare className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-medium mb-2">Send Feedback</h1>
          <p className="text-muted-foreground text-lg">
            We value your input! Help us improve FastConnect
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-medium">Share Your Thoughts</CardTitle>
            <CardDescription>
              Tell us about your experience, report bugs, or suggest new
              features
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Success Message */}
            {success && (
              <div className="p-4 mb-6 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-green-800 dark:text-green-200">
                    Thank you for your feedback!
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    We appreciate your input and will review it soon.
                  </p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-4 mb-6 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Controller
                  name="subject"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="subject"
                      placeholder="Brief description of your feedback"
                      className={errors.subject ? "border-destructive" : ""}
                      disabled={isSubmitting}
                    />
                  )}
                />
                {errors.subject && (
                  <p className="text-xs text-destructive">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Controller
                  name="message"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      id="message"
                      placeholder="Tell us more about your feedback..."
                      rows={6}
                      className={`resize-none ${
                        errors.message ? "border-destructive" : ""
                      }`}
                      disabled={isSubmitting}
                    />
                  )}
                />
                {errors.message && (
                  <p className="text-xs text-destructive">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Feedback
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Other Ways to Reach Us */}
        <div className="mt-8 p-6 rounded-lg bg-accent/50 border">
          <h3 className="font-medium mb-2">Other Ways to Reach Us</h3>
          <p className="text-sm text-muted-foreground mb-4">
            For urgent matters or specific inquiries, you can also contact us
            through:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              <span>Email: faizanfaisal05@gmail.com</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              <span>Email: k230834@nu.edu.pk</span>
            </li>
          </ul>
        </div>
      </PageContent>
    </PageContainer>
  );
}
