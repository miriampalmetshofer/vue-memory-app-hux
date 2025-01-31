<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {Button} from '@/components/ui/button'
import {ConfirmDialogData} from '../types/ConfirmDialogData'

const props = defineProps<{
  confirmDialogData: ConfirmDialogData;
}>();

const {
  defaultOpen,
  showTrigger = true,
  title,
  description,
  triggerText,
  triggerAction,
  actionText = 'Continue',
  action,
  cancelText = 'Cancel',
  cancel,
} = props.confirmDialogData;
</script>

<template>
  <AlertDialog :default-open="defaultOpen">
    <AlertDialogTrigger v-if="showTrigger">
      <Button
        variant="outline"
        @click="triggerAction"
      >
        {{ triggerText }}
      </Button>
    </AlertDialogTrigger>

    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ title }}</AlertDialogTitle>
        <AlertDialogDescription>{{ description }}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="cancel">
          {{ cancelText }}
        </AlertDialogCancel>
        <AlertDialogAction @click="action">
          {{ actionText }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>