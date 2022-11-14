<script>
    import {Meta, Template, Story} from "@storybook/addon-svelte-csf"
    import Demo from "$lib/Demo.svelte";

    let defaultArgs = {
        value: "Hello World"
    }
    function withDefaults(args) {
        return {
            ...defaultArgs,
            ...args
        }
    }
</script>

<Meta title="Example/Demo" component={Demo}/>

<Template let:args>
    <Demo {...withDefaults(args)} />
</Template>

<Story name="Default" args={{}}/>
