//Generated by WriteToModeldeletedialog_tsx - ModelDeleteDialog.tsx
"use client";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { useCardSkillDeleteDialog } from "@/hooks/card-skills/useCardSkillDeleteDialog";
import {
  PLURALIZED_VERBOSE_MODEL_NAME,
  VERBOSE_MODEL_NAME,
} from "@/utils/constants/CardSkillConstants";
import { useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { CardSkillDeletePayload } from "@/interfaces/CardSkillInterfaces";
import axiosClient from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import { useCardSkillStore } from "@/hooks/card-skills/useCardSkillStore";

interface CardSkillDeleteDialogProps {
  onSuccess?: () => void;
  formik?: any;
}

export function CardSkillDeleteDialog(props: CardSkillDeleteDialogProps) {
  const [mounted, setMounted] = useState(false);
  const [
    isDialogLoading,
    recordsToDelete,
    setRecordsToDelete,
    setIsDialogLoading,
  ] = useCardSkillDeleteDialog((state) => [
    state.isDialogLoading,
    state.recordsToDelete,
    state.setRecordsToDelete,
    state.setIsDialogLoading,
  ]);

  const [currentData, resetRowSelection, setCurrentData] = useCardSkillStore(
    (state) => [
      state.currentData,
      state.resetRowSelection,
      state.setCurrentData,
    ]
  );

  const deleteCardSkills = async (payload: CardSkillDeletePayload) => {
    const { data } = (await axiosClient({
      url: "card-skills",
      method: "delete",
      data: payload,
    })) as { data: { recordsDeleted: number } };

    return data;
  };

  const { mutate } = useMutation({
    mutationFn: deleteCardSkills,
    onMutate: () => {
      setIsDialogLoading(true);
    },
    onSuccess: (data) => {
      props.formik.setFieldValue(
        "CardSkills",
        currentData.filter(
          (item) => !recordsToDelete.includes(item.id.toString())
        )
      );
    },
    onSettled: () => {
      setRecordsToDelete([]);
      setIsDialogLoading(false);
      resetRowSelection();
    },
  });

  //state transformation
  const open = recordsToDelete.length > 0;
  const s = recordsToDelete.length > 1 ? "s" : "";
  const caption =
    recordsToDelete.length > 1
      ? PLURALIZED_VERBOSE_MODEL_NAME
      : VERBOSE_MODEL_NAME;

  const mutateCardSkill = () => {
    mutate && mutate({ deletedCardSkills: recordsToDelete });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogPrimitive.Close
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            onClick={() => setRecordsToDelete([])}
            disabled={isDialogLoading}
          >
            <X className="w-4 h-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
          <DialogHeader>
            <DialogTitle>{`Delete ${caption}`}</DialogTitle>
            <DialogDescription>
              {`This will permanently delete the selected record${s}.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              size="sm"
              variant={"destructive"}
              isLoading={isDialogLoading}
              onClick={() => {
                mutateCardSkill();
              }}
            >
              Proceed
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => {
                setRecordsToDelete([]);
              }}
              disabled={isDialogLoading}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
}
