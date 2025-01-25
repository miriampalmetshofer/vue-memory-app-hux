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
  title,
  description,
  triggerText,
  triggerAction,
  actionText = 'Continue',
  action,
  cancel,
} = props.confirmDialogData;

</script>

<template>
  <AlertDialog :default-open="defaultOpen">
    <AlertDialogTrigger>
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
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction @click="action">
          {{ actionText }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>