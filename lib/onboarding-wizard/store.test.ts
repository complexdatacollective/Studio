import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Priorities, type Wizard } from '~/schemas/protocol/wizards';
import { createWizardStore } from './store';

const mockGetItem = vi.fn();
const mockSetItem = vi.fn();

// Sample wizard data
const mockWizard: Wizard = {
  id: 'wizard1',
  steps: [{ id: 'step1' }, { id: 'step2' }, { id: 'step3' }],
  priority: Priorities.Task,
};

let store: ReturnType<typeof createWizardStore>;

beforeEach(() => {
  store = createWizardStore(mockGetItem, mockSetItem);
});

describe('WizardStore', () => {
  it('registers a wizard', () => {
    store.getState().registerWizard(mockWizard);
    const registeredWizards = store.getState().wizards;
    expect(registeredWizards).toHaveProperty('wizard1');
    expect(registeredWizards['wizard1'].steps.length).toBe(3);
  });

  it('sets an active wizard', () => {
    store.getState().registerWizard(mockWizard);
    store.getState().setActiveWizard('wizard1');
    expect(store.getState().activeWizardId).toBe('wizard1');
    expect(store.getState().progress.total).toBe(3);
    expect(store.getState().progress.current).toBe(1);
  });

  it('throws an error when setting an active wizard that does not exist', () => {
    expect(() => store.getState().setActiveWizard('nonexistent')).toThrow(
      'Wizard with id nonexistent not found',
    );
  });

  it('moves to the next step', () => {
    store.getState().registerWizard(mockWizard);
    store.getState().setActiveWizard('wizard1');
    store.getState().nextStep();
    expect(store.getState().currentStep).toBe(1);
    expect(store.getState().progress.current).toBe(2);
  });

  it('does not allow moving past the last step', () => {
    store.getState().registerWizard(mockWizard);
    store.getState().setActiveWizard('wizard1');
    store.getState().nextStep();
    store.getState().nextStep(); // Move to last step
    store.getState().nextStep(); // Should not move
    expect(store.getState().currentStep).toBe(2);
    expect(store.getState().progress.current).toBe(3);
  });

  it('moves to the previous step', () => {
    store.getState().registerWizard(mockWizard);
    store.getState().setActiveWizard('wizard1');
    store.getState().nextStep(); // Move to step 2
    store.getState().previousStep();
    expect(store.getState().currentStep).toBe(0);
    expect(store.getState().progress.current).toBe(1);
  });

  it('returns false if there is no next step', () => {
    store.getState().registerWizard(mockWizard);
    store.getState().setActiveWizard('wizard1');
    store.getState().nextStep();
    store.getState().nextStep(); // Move to last step
    expect(store.getState().hasNextStep()).toBe(false);
  });

  it('returns true if there is a previous step', () => {
    store.getState().registerWizard(mockWizard);
    store.getState().setActiveWizard('wizard1');
    store.getState().nextStep(); // Move to step 2
    expect(store.getState().hasPreviousStep()).toBe(true);
  });

  it('deregisters a wizard', () => {
    store.getState().registerWizard(mockWizard);
    store.getState().deregisterWizard('wizard1');
    const registeredWizards = store.getState().wizards;
    expect(registeredWizards).not.toHaveProperty('wizard1');
  });
});
