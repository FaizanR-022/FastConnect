import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";

/**
 * Skills manager with add/remove functionality
 * Allows adding skills via input and removing via badge buttons
 */
export default function SkillsManager({ skills, setValue }) {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !skills.find((s) => s.name === newSkill.trim())) {
      setValue("skills", [...skills, { name: newSkill.trim() }], {
        shouldDirty: true,
      });
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    setValue(
      "skills",
      skills.filter((_, i) => i !== index),
      { shouldDirty: true }
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <>
      <Separator />

      <div>
        <p className="text-sm font-semibold text-muted-foreground mb-4">
          Skills & Expertise
        </p>

        {/* Add skill input */}
        <div className="flex gap-2 mb-4">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., React, Node.js"
            className="flex-1"
          />
          <Button type="button" onClick={addSkill}>
            Add
          </Button>
        </div>

        {/* Skills display */}
        <div className="flex flex-wrap gap-2 min-h-[50px]">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20 gap-1 pr-1"
            >
              {skill.name}
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}
