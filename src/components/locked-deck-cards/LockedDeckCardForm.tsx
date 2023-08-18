//Generated by WriteToModelform_tsx - ModelForm.tsx
"use client";
import {
  LockedDeckCardFormFormikInitialValues,
  LockedDeckCardModel,
  LockedDeckCardSearchParams,
} from "@/interfaces/LockedDeckCardInterfaces";
import { Form, Formik, FormikHelpers, FormikProps, useFormikContext, } from "formik";
import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { DEFAULT_FORM_VALUE, CONTROL_OPTIONS, PRIMARY_KEY,
 } from "@/utils/constants/LockedDeckCardConstants";
import { useURL } from "@/hooks/useURL";
import FormikControl from "@/components/form/FormikControl";
import { Button } from "@/components/ui/Button";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { sortData } from "@/utils/sort";
import { useLockedDeckCardStore } from "@/hooks/locked-deck-cards/useLockedDeckCardStore";
import { toast } from "@/hooks/use-toast";
import { useLockedDeckCardQuery } from "@/hooks/locked-deck-cards/useLockedDeckCardQuery";
import { convertArrayItemsToStrings } from "@/utils/utils";
import { LockedDeckCardSchema } from "@/schema/LockedDeckCardSchema";
import { Trash } from "lucide-react";
import { useLockedDeckCardDeleteDialog } from "@/hooks/locked-deck-cards/useLockedDeckCardDeleteDialog";
import { LockedDeckCardDeleteDialog } from "@/components/locked-deck-cards/LockedDeckCardDeleteDialog";


//Generated by GetAllModelFormRequiredRightModelListImport
//Generated by GetModelFormRequiredRightModelListImport - GetModelFormRequiredRightModelListImport
import useCardList from "@/hooks/cards/useCardList";
//Generated by GetModelFormRequiredRightModelListImport - GetModelFormRequiredRightModelListImport
import useLockedDeckList from "@/hooks/locked-decks/useLockedDeckList";

interface LockedDeckCardFormProps {
  data: LockedDeckCardModel | null;
  id: string;
}

const LockedDeckCardForm: React.FC<LockedDeckCardFormProps> = (prop) => {
  const { id } = prop;
  const { router, query, pathname } = useURL<LockedDeckCardSearchParams>();

  //Local states
  const [mounted, setMounted] = useState(false);
  const [recordName, setRecordName] = useState(
    prop.data ? prop.data.id : "New Locked Deck Card"
  );
  
  const ref = useRef<any>(null);

  //Zustand variables
  const { isUpdating, setIsUpdating, hasUpdate, setHasUpdate } = useLockedDeckCardStore((state) => ({
    isUpdating: state.isUpdating,
    setIsUpdating: state.setIsUpdating,
    hasUpdate: state.hasUpdate,
    setHasUpdate: state.setHasUpdate,
  }));

  const { setRecordsToDelete } = useLockedDeckCardDeleteDialog((state) => ({
    setRecordsToDelete: state.setRecordsToDelete,
  }));

  

  //Tanstack queries
  
  //Generated by GetAllRelatedRightModelListFromRelatedModel
//Generated by GetRelatedRightModelListFromRelatedModel - GetRelatedRightModelListFromRelatedModel
const { data: cardList } = useCardList({
    placeholderData: prop.data
      ? [
          {
            id: prop.data.cardId,
            name: prop.data.Card.name,
          },
        ]
      : [],
  });
//Generated by GetRelatedRightModelListFromRelatedModel - GetRelatedRightModelListFromRelatedModel
const { data: lockedDeckList } = useLockedDeckList({
    placeholderData: prop.data
      ? [
          {
            id: prop.data.lockedDeckId,
            name: prop.data.LockedDeck.name,
          },
        ]
      : [],
  });
  

  const { lockedDeckCardMutation, lockedDeckCardQuery } = useLockedDeckCardQuery(id, {
    enabled: mounted && id !== "new",
    initialData: prop.data,
  });

  const lockedDeckCard = lockedDeckCardQuery.data;
  

  const initialValues: LockedDeckCardFormFormikInitialValues = {
    ...DEFAULT_FORM_VALUE,
    //Generated by GetAllRightModelDefaultList
//Generated by GetRightModelDefaultList - GetRightModelDefaultList
cardId: cardList && cardList.length > 0 ? cardList[0].id : "",
//Generated by GetRightModelDefaultList - GetRightModelDefaultList
lockedDeckId: lockedDeckList && lockedDeckList.length > 0 ? lockedDeckList[0].id : "",
    
    
  };

  if (lockedDeckCard) {
    for (const key in initialValues) {
      if (lockedDeckCard.hasOwnProperty(key) && initialValues.hasOwnProperty(key)) {
        //@ts-ignore
        //prettier-ignore
        initialValues[key] = lockedDeckCard[key] === null ? "" : lockedDeckCard[key];
      }
    }

    
    
    
  }

  

  const handleFocus = () => {
    ref && ref.current.focus();
  };

  const handleHasUdpate = () => {
    setHasUpdate(true);
  };

  const handleFormikSubmit = (
    values: LockedDeckCardFormFormikInitialValues,
    formik: FormikHelpers<LockedDeckCardFormFormikInitialValues>
  ) => {
    //@ts-ignore
    const addNew: boolean = values.addNew;

    const goToNewRecord = () => {
      formik.setValues({
        ...DEFAULT_FORM_VALUE,
        
        
      });
      window.history.pushState(
        {},
        "",
        `${window.location.origin}/locked-deck-cards/new`
      );
      setRecordName("New Locked Deck Card");

      handleFocus();
    };
    
    
    
    if (hasUpdate){
      const payload = {
        ...values,
        
        
      };

      lockedDeckCardMutation.mutateAsync(payload).then((data) => {
      if (addNew) {
        goToNewRecord()
      } else {
        if (data.id) {
          formik.setFieldValue("id", data.id);
        }

        if (data.id) {
          window.history.pushState(
            {},
            "",
            `${window.location.origin}/locked-deck-cards/${data.id}`
          );
        }

        setRecordName(values.id);
  
        

        

      }

      toast({
        description: "Locked Deck Card list updated successfully",
        variant: "success",
        duration: 2000,
      });
    }).catch((err) => console.log(err));

    } else {
      if (addNew) {
        goToNewRecord();
      }
    }
    
    
  };

  const renderFormik = (formik: FormikProps<LockedDeckCardFormFormikInitialValues>) => {
    const handleSubmitClick: MouseEventHandler = (e) => {
      e.preventDefault();
      formik.submitForm();
    };

    return (
      <Form
        className="flex flex-col flex-1 h-full gap-4"
        autoComplete="off"
      >
        {/* Generated by GetSelectFormControl - Select Form Control */}
<FormikControl
          name="lockedDeckId"
          options={lockedDeckList || []}
          label="Locked Deck"
          type="Select"
          showLabel={true}
          allowBlank={false}
          containerClassNames={["w-full"]}
          setHasUpdate={handleHasUdpate}
        />
{/* Generated by GetComboBoxFormControl - GetComboBoxFormControl */}
<FormikControl
          name="cardId"
          options={cardList || []}
          type="ComboBox"
          showLabel={true}
          label="Card"
          containerClassNames={["min-w-[200px]"]}
          setHasUpdate={handleHasUdpate}
        />
        
        
        <div className="flex gap-2 mt-auto">
          <Button
            type="button"
            size={"sm"}
            variant={"secondary"}
            onClick={(e) => {
              formik.setFieldValue("addNew", true);
              handleSubmitClick(e);
            }}
          >
            Save & Add New
          </Button>
          <Button
            type="button"
            size={"sm"}
            variant={"secondary"}
            onClick={(e) => {
              formik.setFieldValue("addNew", false);
              handleSubmitClick(e);
            }}
          >
            Save
          </Button>
          <Button
            type="button"
            size={"sm"}
            variant={"ghost"}
            onClick={(e) => {
              router.back();
            }}
          >
            Cancel
          </Button>
          {id !== "new" && (
            <Button
              type="button"
              size={"sm"}
              variant={"destructive"}
              onClick={(e) => {
                setRecordsToDelete([formik.values[PRIMARY_KEY].toString()]);
              }}
              className={"ml-auto"}
            >
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </Button>
          )}
        </div>
      </Form>
    );
  };

  useEffect(() => {
    setMounted(true);
    handleFocus();
  }, []);

  return (
    <>
      <Breadcrumb
        links={[
          { name: "Locked Deck Cards", href: "/locked-deck-cards" },
          { name: recordName, href: "" },
        ]}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormikSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize={true}
        validationSchema={LockedDeckCardSchema}
      >
        {renderFormik}
      </Formik>
      <LockedDeckCardDeleteDialog
        onSuccess={() => {
          toast({
            description: "Locked Deck Card successfully deleted.",
            variant: "success",
            duration: 4000,
          });
          router.back();
        }}
      />
    </>
  );
};

export default LockedDeckCardForm;