export type ConfirmDialogData = {
    defaultOpen?: boolean;
    showTrigger?: boolean;
    title: string;
    description: string;
    triggerText?: string;
    triggerAction?: () => void;
    actionText: string;
    action?: () => void;
    cancelText?: string;
    cancel?: () => void;
}