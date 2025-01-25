export type ConfirmDialogData = {
    defaultOpen?: boolean;
    title: string;
    description: string;
    triggerText: string;
    triggerAction?: () => void;
    actionText: string;
    action?: () => void;
    cancel?: () => void;
}