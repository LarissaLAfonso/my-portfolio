<svelte:head>
    <title>Projects</title>
</svelte:head>

<script>
    import projects from "$lib/projects.json";
    import Project from "$lib/Project.svelte";
</script>

<h1>My projects</h1>
<div class="projects">
    {#each projects as p} 
      <Project data={p} />
    {/each}
  </div>