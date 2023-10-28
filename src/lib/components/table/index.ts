import Table from './table.svelte';
import Thead from './thead.svelte';
import Tbody from './tbody.svelte';
import Tr from './tr.svelte';
import Th from './th.svelte';
import Td from './td.svelte';

const TableComponent = Object.assign(Table, {
	Thead: Thead,
	Tbody: Tbody,
	Tr: Tr,
	Th: Th,
	Td: Td
});

export default TableComponent;
