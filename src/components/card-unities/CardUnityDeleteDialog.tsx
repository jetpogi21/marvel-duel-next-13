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
import { useCardUnityDeleteDialog } from "@/hooks/card-unities/useCardUnityDeleteDialog";
import {
  PLURALIZED_VERBOSE_MODEL_NAME,
  VERBOSE_MODEL_NAME,
} from "@/utils/constants/CardUnityConstants";
import { useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { CardUnityDeletePayload } from "@/interfaces/CardUnityInterfaces";
import axiosClient from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import { useCardUnityStore } from "@/hooks/card-unities/useCardUnityStore";

interface CardUnityDeleteDialogProps {
  onSuccess?: () => void;
}

export function CardUnityDeleteDialog(props: CardUnityDeleteDialogProps) {
  const [mounted, setMounted] = useState(false);
  const [
    isDialogLoading,
    recordsToDelete,
    setRecordsToDelete,
    setIsDialogLoading,
  ] = useCardUnityDeleteDialog((state) => [
    state.isDialogLoading,
    state.recordsToDelete,
    state.setRecordsToDelete,
    state.setIsDialogLoading,
  ]);

  const [currentData, resetRowSelection, setCurrentData] = useCardUnityStore(
    (state) => [
      state.currentData,
      state.resetRowSelection,
      state.setCurrentData,
    ]
  );

  const deleteCardUnities = async (payload: CardUnityDeletePayload) => {
    const { data } = (await axiosClient({
      url: "card-unities",
      method: "delete",
      data: payload,
    })) as { data: { recordsDeleted: number } };

    return data;
  };

  const { mutate } = useMutation({
    mutationFn: deleteCardUnities,
    onMutate: () => {
      setIsDialogLoading(true);
    },
    onSuccess: (data) => {
      formik.setFieldValue(
        "CardUnities",
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

  const mutateCardUnity = () => {
    mutate && mutate({ deletedCardUnities: recordsToDelete });
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
                mutateCardUnity();
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
