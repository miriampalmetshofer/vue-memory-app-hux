import {describe, expect, it} from "vitest";
import {mount} from "@vue/test-utils";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import waitForExpect from "wait-for-expect";

describe("ConfirmDialog", () => {

    it("renders correctly", async () => {
        const wrapper = mount(ConfirmDialog, {
            props: {
                confirmDialogData: {
                    triggerText: "Exit",
                    title: "Are you sure?",
                    description: "If you exit now, you can't retrieve your current state.",
                    actionText: "Exit",
                },
            }
        });

        // Verify the trigger button exists
        const triggerButton = wrapper.find("button");
        expect(triggerButton.exists()).toBe(true);
        expect(triggerButton.text()).toBe("Exit");

        // Click the trigger button to open the dialog
        await triggerButton.trigger("click");

        // Verify the dialog content is displayed
        await waitForExpect(() => {
            expect(wrapper.text()).toContain("Are you sure?");
            expect(wrapper.text()).toContain("If you exit now, you can't retrieve your current state.");
            expect(wrapper.text()).toContain("Cancel");
        });

        // Click the "Cancel" button to close the dialog
        const cancelButton = wrapper
            .findAll("button")
            .find((button) => button.text() === "Cancel");

        expect(cancelButton).toBeDefined();
        if (cancelButton === undefined) {
            throw new Error("Cancel button not found");
        }
        await cancelButton.trigger("click");

        // Verify the dialog is closed
        await waitForExpect(() => {
            expect(wrapper.text()).not.toContain("Are you sure?");
        });
    });
});