<script lang="ts">
	import { Button, Label, Input, Toggle, Select, Alert } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	interface Atom {
		variable: string;
		premise: string;
		truthValue: boolean;
	}

	interface NormalizedExpression {
		display: string;
		normalized: string;
	}

	interface Molecule {
		expression: NormalizedExpression;
		truthValue: boolean;
		operator: string;
		components: string[];
	}

	interface Formula {
		id: string;
		expression: NormalizedExpression;
		components: string[];
		operator: string;
		truthValue: boolean;
	}

	let variable = '';
	let premise = '';
	let truthValue = true;
	let atoms: Atom[] = [];
	let molecules: Molecule[] = [];
	let formulas: Formula[] = [];

	let selectedComponents: string[] = [];
	let selectedOperator = '';

	let errorMessage = '';
	let sidebarWidth = 300;
	let isDragging = false;

	const operators = [
		{ value: '¬', name: 'Negation (¬)' },
		{ value: '∧', name: 'Conjunction (∧)' },
		{ value: '∨', name: 'Disjunction (∨)' },
		{ value: '→', name: 'Implication (→)' },
		{ value: '↔', name: 'Biconditional (↔)' }
	];

	onMount(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (isDragging) {
				sidebarWidth = Math.max(200, Math.min(e.clientX, window.innerWidth - 200));
			}
		};

		const handleMouseUp = () => {
			isDragging = false;
		};

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	});

	function startResize() {
		isDragging = true;
	}

	function addAtom() {
		if (!variable || !premise) {
			errorMessage = 'Please fill out both the variable and premise fields.';
			return;
		}
		if (atoms.some((atom) => atom.variable === variable)) {
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
		selectedComponents = selectedComponents.filter((v) => v !== deletedAtom);
		molecules = molecules.filter((m) => !m.components.includes(deletedAtom));
		formulas = formulas.filter((f) => !f.components.includes(deletedAtom));
		updateAllTruthValues();
	}

	function toggleComponentSelection(component: string) {
		if (selectedComponents.includes(component)) {
			selectedComponents = selectedComponents.filter((c) => c !== component);
		} else {
			if (selectedComponents.length < 2) {
				selectedComponents = [...selectedComponents, component];
			} else {
				errorMessage = 'You can only select up to two components at a time.';
			}
		}
	}

	function toggleAtomTruthValue(index: number) {
		atoms[index].truthValue = !atoms[index].truthValue;
		atoms = [...atoms]; // Trigger reactivity
		updateAllTruthValues();
	}

	function buildExpression(components: string[], operator: string): NormalizedExpression {
		let display: string;
		let normalized: string;

		if (operator === '¬') {
			display = normalized = `¬${components[0]}`;
		} else if (operator === '∧' || operator === '∨') {
			display = `(${components.join(` ${operator} `)})`;
			normalized = `(${components.slice().sort().join(` ${operator} `)})`;
		} else {
			display = normalized = `(${components.join(` ${operator} `)})`;
		}

		return { display, normalized };
	}

	function evaluateExpression(expression: NormalizedExpression): boolean {
		function evaluateAtom(atom: string): boolean {
			const atomObj = atoms.find((a) => a.variable === atom);
			return atomObj ? atomObj.truthValue : false;
		}

		function evaluateMolecule(molecule: string): boolean {
			const moleculeObj = molecules.find((m) => m.expression.normalized === molecule);
			if (moleculeObj) {
				return evaluateSubExpression(moleculeObj.expression.normalized);
			}
			return false;
		}

		function evaluateFormula(formula: string): boolean {
			const formulaObj = formulas.find((f) => f.expression.normalized === formula);
			if (formulaObj) {
				return evaluateSubExpression(formulaObj.expression.normalized);
			}
			return false;
		}

		function evaluateSubExpression(subExpr: string): boolean {
			subExpr = subExpr.trim();
			if (subExpr.startsWith('(') && subExpr.endsWith(')')) {
				subExpr = subExpr.slice(1, -1).trim();
			}

			let negationCount = 0;
			while (subExpr.startsWith('¬')) {
				negationCount++;
				subExpr = subExpr.slice(1).trim();
			}

			let result: boolean;

			if (subExpr.includes('∧')) {
				result = subExpr.split('∧').every((v) => evaluateSubExpression(v.trim()));
			} else if (subExpr.includes('∨')) {
				result = subExpr.split('∨').some((v) => evaluateSubExpression(v.trim()));
			} else if (subExpr.includes('→')) {
				const [p, q] = subExpr.split('→').map((v) => evaluateSubExpression(v.trim()));
				result = !p || q;
			} else if (subExpr.includes('↔')) {
				const [p, q] = subExpr.split('↔').map((v) => evaluateSubExpression(v.trim()));
				result = p === q;
			} else {
				result = evaluateAtom(subExpr) || evaluateMolecule(subExpr) || evaluateFormula(subExpr);
			}

			return negationCount % 2 === 0 ? result : !result;
		}

		return evaluateSubExpression(expression.normalized);
	}

	function createMolecule() {
		if (selectedComponents.length === 0 || !selectedOperator) {
			errorMessage = 'Please select components and an operator.';
			return;
		}
		if (selectedOperator !== '¬' && selectedComponents.length !== 2) {
			errorMessage = 'Please select exactly two components for this operator.';
			return;
		}
		if (selectedOperator === '¬' && selectedComponents.length !== 1) {
			errorMessage = 'Please select exactly one component for negation.';
			return;
		}

		let expression = buildExpression(selectedComponents, selectedOperator);
		const moleculeTruthValue = evaluateExpression(expression);
		molecules = [
			...molecules,
			{
				expression,
				truthValue: moleculeTruthValue,
				operator: selectedOperator,
				components: selectedComponents
			}
		];

		selectedComponents = [];
		selectedOperator = '';
		errorMessage = '';
		updateAllTruthValues();
	}

	function deleteMolecule(index: number) {
		const deletedMolecule = molecules[index].expression.display;
		molecules = molecules.filter((_, i) => i !== index);
		selectedComponents = selectedComponents.filter((c) => c !== deletedMolecule);
		formulas = formulas.filter((f) => !f.components.includes(deletedMolecule));
		updateAllTruthValues();
	}

	function createFormula() {
		if (selectedComponents.length === 0 || !selectedOperator) {
			errorMessage = 'Please select components and an operator.';
			return;
		}
		if (selectedOperator !== '¬' && selectedComponents.length !== 2) {
			errorMessage = 'Please select exactly two components for this operator.';
			return;
		}
		if (selectedOperator === '¬' && selectedComponents.length !== 1) {
			errorMessage = 'Please select exactly one component for negation.';
			return;
		}

		let expression = buildExpression(selectedComponents, selectedOperator);
		const formulaTruthValue = evaluateExpression(expression);
		const newFormula: Formula = {
			id: `f${formulas.length + 1}`,
			expression,
			components: [...selectedComponents],
			operator: selectedOperator,
			truthValue: formulaTruthValue
		};
		formulas = [...formulas, newFormula];

		selectedComponents = [];
		selectedOperator = '';
		errorMessage = '';
		updateAllTruthValues();
	}

	function deleteFormula(index: number) {
		const deletedFormula = formulas[index].expression.display;
		formulas = formulas.filter((_, i) => i !== index);
		selectedComponents = selectedComponents.filter((c) => c !== deletedFormula);
		updateAllTruthValues();
	}

	function updateAllTruthValues() {
		let updated = false;
		do {
			updated = false;
			molecules = molecules.map((m) => {
				const newTruthValue = evaluateExpression(m.expression);
				if (newTruthValue !== m.truthValue) {
					updated = true;
					return { ...m, truthValue: newTruthValue };
				}
				return m;
			});
			formulas = formulas.map((f) => {
				const newTruthValue = evaluateExpression(f.expression);
				if (newTruthValue !== f.truthValue) {
					updated = true;
					return { ...f, truthValue: newTruthValue };
				}
				return f;
			});
		} while (updated);
	}

	$: {
		// Reactively update truth values when atoms, molecules, or formulas change
		if (atoms.length || molecules.length || formulas.length) {
			updateAllTruthValues();
		}
	}
</script>

<div class="flex h-screen flex-col md:flex-row">
	<aside
		class="w-full flex-shrink-0 overflow-y-auto border-r border-gray-200 bg-white p-4 md:w-auto"
		style="width: {sidebarWidth}px;"
	>
		{#if errorMessage}
			<Alert color="red" class="mb-4">
				<span class="font-medium">Error:</span>
				{errorMessage}
			</Alert>
		{/if}

		<div class="mt-6 mb-6">
			<h2 class="mb-2 text-xl font-semibold">Dictionary</h2>
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
			<h2 class="mb-2 text-xl font-semibold">Atoms</h2>
			{#each atoms as atom, index}
				<div
					class="mb-2 flex cursor-pointer items-center justify-between rounded p-2"
					style="background-color: {atom.truthValue ? '#4ade80' : '#f87171'}; 
                            border: {selectedComponents.includes(atom.variable)
						? '2px solid blue'
						: 'none'}"
					on:click={() => toggleComponentSelection(atom.variable)}
				>
					<span>{atom.variable}: {atom.premise}</span>
					<div>
						<Toggle
							size="small"
							checked={atom.truthValue}
							on:change={() => toggleAtomTruthValue(index)}
						/>
						<button
							on:click|stopPropagation={() => deleteAtom(index)}
							class="ml-2 text-gray-500 hover:text-gray-700">×</button
						>
					</div>
				</div>
			{/each}
		</div>

		<div class="mb-6">
			<h2 class="mb-2 text-xl font-semibold">Molecules</h2>
			<div class="mb-2">
				<Label for="molecule-operator" class="mb-2">Logical Operator</Label>
				<Select
					id="molecule-operator"
					items={operators}
					bind:value={selectedOperator}
					placeholder="Select an operator"
				/>
			</div>
			<Button
				on:click={createMolecule}
				class="mb-4"
				disabled={selectedComponents.length === 0 || !selectedOperator}>Create Molecule</Button
			>
			{#each molecules as molecule, index}
				<div
					class="mb-2 cursor-pointer rounded p-2"
					style="background-color: {molecule.truthValue ? '#4ade80' : '#f87171'}; 
                            border: {selectedComponents.includes(molecule.expression.display)
						? '2px solid blue'
						: 'none'}"
					on:click={() => toggleComponentSelection(molecule.expression.display)}
				>
					<div class="flex items-center justify-between">
						<span>{molecule.expression.display}</span>
						<button
							on:click|stopPropagation={() => deleteMolecule(index)}
							class="text-gray-500 hover:text-gray-700">×</button
						>
					</div>
				</div>
			{/each}
		</div>

		<div class="mb-6">
			<h2 class="mb-2 text-xl font-semibold">Formulas</h2>
			<div class="mb-2">
				<Label for="formula-operator" class="mb-2">Logical Operator</Label>
				<Select
					id="formula-operator"
					items={operators}
					bind:value={selectedOperator}
					placeholder="Select an operator"
				/>
			</div>
			<Button
				on:click={createFormula}
				class="mb-4"
				disabled={selectedComponents.length === 0 || !selectedOperator}>New Formula</Button
			>
			{#each formulas as formula, index}
				<div
					class="mb-2 cursor-pointer rounded p-2"
					style="background-color: {formula.truthValue ? '#4ade80' : '#f87171'}; 
                            border: {selectedComponents.includes(formula.expression.display)
						? '2px solid blue'
						: 'none'}"
					on:click={() => toggleComponentSelection(formula.expression.display)}
				>
					<div class="flex items-center justify-between">
						<span>{formula.expression.display}</span>
						<button
							on:click|stopPropagation={() => deleteFormula(index)}
							class="text-gray-500 hover:text-gray-700">×</button
						>
					</div>
				</div>
			{/each}
		</div>
	</aside>

	<div class="w-1 cursor-col-resize bg-gray-300 hover:bg-gray-400" on:mousedown={startResize}></div>

	<main class="flex-grow overflow-y-auto bg-gray-100 p-4">
		<p class="text-base dark:text-white">
			Use the sidebar to create and manage your logical components. The canvas for visual
			representation will be implemented in a future update.
		</p>
	</main>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
