import { Save, Loader2 } from "lucide-react";
import { Controller } from "react-hook-form";

import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import ImageUpload from "../../components/common/ImageUpload";
import {
  PageContainer,
  PageContent,
  BackButton,
  LoadingSpinner,
} from "../../components/layout";
import EditProfileHeader from "../../components/profile/EditProfileHeader";
import AlertMessages from "../../components/profile/AlertMessages";
import ReadOnlyInfo from "../../components/profile/ReadOnlyInfo";
import StudentPersonalInfoSection from "../../components/profile/student/StudentPersonalInfoSection";

import { useStudentProfile } from "../../hooks/useStudentProfile";
import useAuthStore from "../../store/authStore";

export default function StudentProfile() {
  const { user } = useAuthStore();

  const {
    control,
    handleSubmit,
    errors,
    isDirty,
    loading,
    submitting,
    error,
    success,
    onSubmit,
  } = useStudentProfile();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <PageContainer>
      <PageContent maxWidth="2xl">
        <BackButton />

        <Card>
          <CardContent className="p-6 md:p-8">
            <EditProfileHeader
              profilePicture={user?.profilePicture}
              firstName={user?.firstName}
              lastName={user?.lastName}
            />

            <Separator className="mb-6" />

            <AlertMessages error={error} success={success} />

            <ReadOnlyInfo user={user} />

            <Separator className="mb-6" />

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <StudentPersonalInfoSection control={control} errors={errors} />

                <Separator />

                {/* Profile Picture */}
                <Controller
                  name="profilePicture"
                  control={control}
                  render={({ field }) => (
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                      label="Profile Picture (Optional)"
                    />
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={submitting || !isDirty}
                >
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {submitting ? "Saving..." : "Save Changes"}
                </Button>

                {!isDirty && (
                  <p className="text-xs text-center text-muted-foreground">
                    Make changes to enable the save button
                  </p>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </PageContent>
    </PageContainer>
  );
}
