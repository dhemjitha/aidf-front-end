import React from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

const ConfirmJobDeletionToast = ({ onConfirm, onCancel }) => (
  <div>
    <p>Are you sure you want to delete this job?</p>
    <div className="flex justify-end gap-2 mt-4">
      <Button onClick={onConfirm} variant="destructive">
        Yes
      </Button>
      <Button onClick={onCancel} variant="outline">
        No
      </Button>
    </div>
  </div>
);

export default ConfirmJobDeletionToast;
