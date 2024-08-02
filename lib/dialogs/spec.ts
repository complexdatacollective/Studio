/**
 * Core features for this branch:
 *
 * - Dialog system for Studio, for use mainly on the researcher facing side of the app. But we do need to be able to use it in the interview if required.
 *
 * Dialog system functionality:
 * - Dialog stacking. The most recently displayed dialog should be on top. Dialogs should be rendered in reverse order.able
 * - Should be possible to `await` a dialog to get a value corresponding to the outcome. For example, true/false for a dialog that asks for a choice between yes/no.
 * - Dialog types. Predefined dialog definitions, which enable certain behaviours. For example, a type might require that the user click a button to continue (disabling/removing the close button).
 *
 * Requirements:
 * - Some sort of dialog state, which stores the dialogs that are active.
 * - Actions to add a dialog, and remove a dialog.
 * - A dialog manager that renders dialogs
 * - A hook that enables creating a dialog.
 * - A way to create a dialog outside of a react component or hook.
 * - A dialog component that takes some options, and renders a dialog, taking into account its type etc.
 * - Storybook illustrations of the above:
 *   - Dialog manager, showing implementation of add/remove and stacking behaviour. Should not use the dialog component.
 *   - Dialog component showing the props interface for the Dialog. Should not use the dialog manager.
 *   - Together, these stories are the "Dialog system".
 *
 * Implementation:
 * - Set up a dialog store with the required actions.
 * - Create a component that renders the dialogs. (DialogManager)
 * - Set up a storybook for the DialogManager.
 * - Create a basic dialog component
 * - Set up a storybook for the Dialog component.
 */
