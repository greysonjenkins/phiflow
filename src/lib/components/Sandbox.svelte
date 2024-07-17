<script lang="ts">
    import { Button, Label, Input, Toggle, Select, Alert } from 'flowbite-svelte';

    interface Atom {
        variable: string;
        premise: string;
        truthValue: boolean;
    }

    interface Molecule {
        expression: string;
        truthValue: boolean;
        operator: string;
        atoms: string[];
    }

    let variable = '';
    let premise = '';
    let truthValue = true;
    let atoms: Atom[] = [];
    let molecules: Molecule[] = [];

    let selectedAtoms: string[] = [];
    let selectedOperator = '';

    let errorMessage = '';

    const operators = [
        { value: '¬', name: 'Negation (¬)' },
        { value: '∧', name: 'Conjunction (∧)' },
        { value: '∨', name: 'Disjunction (∨)' },
        { value: '→', name: 'Implication (→)' },
        { value: '↔', name: 'Biconditional (↔)' }
    ];

    function addAtom() {
        if (!variable || !premise) {
            errorMessage = 'Please fill out both the variable and premise fields.';
            return;
        }
        if (atoms.some(atom => atom.variable === variable)) {
            errorMessage = 'This variable name is already in use. Please choose a different one.';
            return;
        }
        atoms = [...atoms, { variable, premise, truthValue }];
        variable = '';
        premise = '';
        truthValue = true;
        errorMessage = '';
    }

    function deleteAtom(index: number) {
        const deletedAtom = atoms[index].variable;
        atoms = atoms.filter((_, i) => i !== index);
        selectedAtoms = selectedAtoms.filter(v => v !== deletedAtom);
        molecules = molecules.filter(m => !m.atoms.includes(deletedAtom));
    }

    function toggleAtomSelection(atomVariable: string) {
        if (selectedAtoms.includes(atomVariable)) {
            selectedAtoms = selectedAtoms.filter(v => v !== atomVariable);
        } else {
            selectedAtoms = [...selectedAtoms, atomVariable];
        }
        errorMessage = '';
    }

    function toggleAtomTruthValue(index: number) {
        atoms[index].truthValue = !atoms[index].truthValue;
        atoms = [...atoms]; // Trigger reactivity
        updateMoleculeTruthValues();
    }

    function createMolecule() {
        if (selectedAtoms.length === 0 || !selectedOperator) {
            errorMessage = 'Please select atoms and an operator.';
            return;
        }
        if (selectedOperator !== '¬' && selectedAtoms.length !== 2) {
            errorMessage = 'Please select exactly two atoms for this operator.';
            return;
        }
        if (selectedOperator === '¬' && selectedAtoms.length !== 1) {
            errorMessage = 'Please select exactly one atom for negation.';
            return;
        }

        let expression = '';
        if (selectedOperator === '¬') {
            expression = `¬${selectedAtoms[0]}`;
        } else if (selectedOperator === '→') {
            expression = `(${selectedAtoms[0]} → ${selectedAtoms[1]})`;
        } else {
            expression = `(${selectedAtoms.join(` ${selectedOperator} `)})`;
        }
        
        const moleculeTruthValue = evaluateMolecule(expression);
        molecules = [...molecules, { expression, truthValue: moleculeTruthValue, operator: selectedOperator, atoms: [...selectedAtoms] }];
        
        selectedAtoms = [];
        selectedOperator = '';
        errorMessage = '';
    }

    function evaluateMolecule(expression: string): boolean {
        const atomValues = new Map(atoms.map(a => [a.variable, a.truthValue]));
        
        if (expression.startsWith('¬')) {
            return !atomValues.get(expression.slice(1));
        } else if (expression.includes('∧')) {
            return expression.slice(1, -1).split('∧').every(v => atomValues.get(v.trim()));
        } else if (expression.includes('∨')) {
            return expression.slice(1, -1).split('∨').some(v => atomValues.get(v.trim()));
        } else if (expression.includes('→')) {
            const [p, q] = expression.slice(1, -1).split('→').map(v => atomValues.get(v.trim()));
            return !p || q;
        } else if (expression.includes('↔')) {
            const [p, q] = expression.slice(1, -1).split('↔').map(v => atomValues.get(v.trim()));
            return p === q;
        }
        return false;
    }

    function updateMoleculeTruthValues() {
        molecules = molecules.map(m => ({
            ...m,
            truthValue: evaluateMolecule(m.expression)
        }));
    }

    function deleteMolecule(index: number) {
        molecules = molecules.filter((_, i) => i !== index);
    }
</script>

<div class="flex h-[calc(100vh-64px)]">
    <aside class="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
        {#if errorMessage}
            <Alert color="red" class="mb-4">
                <span class="font-medium">Error:</span> {errorMessage}
            </Alert>
        {/if}

        <div class="mb-6">
            <h2 class="text-xl font-semibold mb-2">Dictionary</h2>
            <div class="mb-2">
                <Label for="variable" class="mb-2">Variable</Label>
                <Input id="variable" placeholder="p" bind:value={variable} />
            </div>
            <div class="mb-2">
                <Label for="premise" class="mb-2">Premise</Label>
                <Input id="premise" placeholder="Socrates is a man" bind:value={premise} />
            </div>
            <div class="mb-2 flex items-center">
                <Label class="mr-2">Truth Value</Label>
                <Toggle bind:checked={truthValue} />
            </div>
            <Button on:click={addAtom}>Add Atom</Button>
        </div>

        <div class="mb-6">
            <h2 class="text-xl font-semibold mb-2">Atoms</h2>
            {#each atoms as atom, index}
                <div class="mb-2 flex items-center justify-between p-2 rounded cursor-pointer" 
                     style="background-color: {atom.truthValue ? '#4ade80' : '#f87171'}; 
                            border: {selectedAtoms.includes(atom.variable) ? '2px solid blue' : 'none'}"
                     on:click={() => toggleAtomSelection(atom.variable)}>
                    <span>{atom.variable}: {atom.premise}</span>
                    <div>
                        <Toggle size="small" checked={atom.truthValue} on:change={() => toggleAtomTruthValue(index)} />
                        <button on:click|stopPropagation={() => deleteAtom(index)} class="ml-2 text-gray-500 hover:text-gray-700">×</button>
                    </div>
                </div>
            {/each}
        </div>

        <div class="mb-6">
            <h2 class="text-xl font-semibold mb-2">Molecules</h2>
            <div class="mb-2">
                <Label for="operator" class="mb-2">Logical Operator</Label>
                <Select id="operator" items={operators} bind:value={selectedOperator} placeholder="Select an operator" />
            </div>
            <Button on:click={createMolecule} class="mb-4" disabled={selectedAtoms.length === 0 || !selectedOperator}>Create Molecule</Button>
            {#each molecules as molecule, index}
                <div class="mb-2 p-2 rounded" 
                     style="background-color: {molecule.truthValue ? '#4ade80' : '#f87171'}">
                    <div class="flex justify-between items-center">
                        <span>{molecule.expression}</span>
                        <button on:click={() => deleteMolecule(index)} class="text-gray-500 hover:text-gray-700">×</button>
                    </div>
                    {#if molecule.operator === '→'}
                        <div class="text-xs mt-1">
                            Antecedent: {molecule.atoms[0]}, Consequent: {molecule.atoms[1]}
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    </aside>

    <main class="flex-1 p-4 bg-gray-100 overflow-y-auto">
        <!-- Future canvas area -->
        <div class="h-full flex items-center justify-center">
            <p class="text-gray-500">Canvas area for visual representations (coming soon)</p>
        </div>
    </main>
</div>