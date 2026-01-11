import { Save, Loader2 } from "lucide-react";
import { Controller } from "react-hook-form";

import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";

import { useAlumniProfile } from "../../hooks/useAlumniProfile";
import useAuthStore from "../../store/authStore";
import ImageUpload from "../../components/common/ImageUpload";
import EditProfileHeader from "../../components/profile/EditProfileHeader";
import AlertMessages from "../../components/profile/AlertMessages";
import ReadOnlyInfo from "../../components/profile/ReadOnlyInfo";
import PersonalInfoSection from "../../components/profile/alumni/PersonalInfoSection";
import CurrentPositionSection from "../../components/profile/alumni/CurrentPositionSection";
import PreviousExperiencesSection from "../../components/profile/alumni/PreviousExperiencesSection";
import SkillsManager from "../../components/profile/alumni/SkillsManager";
import ControlledInput from "../../components/forms/ControlledInput";
import {
  PageContainer,
  PageContent,
  BackButton,
  LoadingSpinner,
} from "../../components/layout";

export default function AlumniProfile() {
  const { user } = useAuthStore();

  const {
    control,
    handleSubmit,
    errors,
    isDirty,
    setValue,
    skills,
    loading,
    submitting,
    error,
    success,
    onSubmit,
  } = useAlumniProfile();

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
                <PersonalInfoSection control={control} errors={errors} />

                <CurrentPositionSection control={control} errors={errors} />

                <PreviousExperiencesSection control={control} errors={errors} />

                <SkillsManager skills={skills} setValue={setValue} />

                <Separator />

                <ControlledInput
                  name="linkedin"
                  control={control}
                  label="LinkedIn URL"
                  placeholder="https://linkedin.com/in/yourprofile"
                  error={errors.linkedin?.message}
                  optional
                />

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
