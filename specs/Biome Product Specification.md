# Rabbit & Wolf

## 1. Product Overview

**Rabbit & Wolf** is an interactive ecosystem simulation game.

The player does not directly control the animals.

Instead, the player controls the **rules and environmental conditions** that govern the ecosystem, then runs the simulation and observes what happens.

The core experience is:

> **Define rules → run simulation → observe emergent behavior → change rules → run again.**

The game should feel like a scientific sandbox rather than a traditional strategy game.

There is no predetermined "correct" configuration. The player's goal is to experiment and discover interesting, stable, unstable, or surprising ecosystems.

---

# 2. Core Gameplay Loop

The player starts with an ecosystem containing:

- Grass
- Rabbits
- Wolves

The player can modify the characteristics and behavior of each species.

They then start the simulation.

While the simulation runs, the player observes:

- population changes
- births
- deaths
- predators hunting prey
- animals searching for food
- animals fleeing
- resource depletion and regeneration
- population booms and crashes
- long-term equilibrium

The player can pause the simulation, change rules, and continue.

The player should quickly develop hypotheses such as:

> "There are too many wolves."

> "The rabbits reproduce too slowly."

> "The grass can't regenerate quickly enough."

> "The wolves are too good at hunting."

The player then modifies the ecosystem to test those hypotheses.

---

# 3. Game Philosophy

The simulation should prioritize **emergent behavior**.

The player should not be given scripted outcomes such as:

> "At day 50, the wolves attack."

Instead, interesting behavior should emerge naturally from the rules.

Small changes to the rules should sometimes produce dramatically different outcomes.

The game should encourage experimentation rather than optimization toward a single ideal ecosystem.

---

# 4. The World

The simulation takes place in a natural environment.

The initial world is relatively simple and should be easy to understand visually.

The world contains:

- grass
- rabbits
- wolves

The world should have spatial structure so that animals need to move around to find food or prey.

The player should be able to see the entire ecosystem while it runs.

---

# 5. Time

The simulation progresses continuously.

The player can control simulation speed.

Available controls should include:

- Play
- Pause
- Restart
- Step forward
- Slow
- Normal
- Fast
- Very fast

The player should be able to watch several generations of animals pass quickly.

A visible simulation clock should show something like:

> Day 127

The player should be able to pause at any moment and inspect the ecosystem.

---

# 6. Rabbits

Rabbits are herbivores.

Their primary objective is survival and reproduction.

A rabbit can:

- wander
- search for grass
- eat grass
- flee from wolves
- reproduce
- die

Each rabbit has characteristics that influence its behavior.

The player can modify these characteristics globally for the species.

### Rabbit characteristics

#### Movement Speed

How quickly rabbits can move.

#### Vision

How far rabbits can detect:

- grass
- wolves

#### Metabolism

How quickly rabbits consume energy.

Higher metabolism means rabbits need food more frequently.

#### Reproduction Threshold

How much energy a rabbit must have before it can reproduce.

#### Reproduction Rate

How likely a healthy rabbit is to reproduce.

#### Fear

How strongly rabbits react to nearby wolves.

Higher fear causes rabbits to prioritize fleeing over feeding or wandering.

---

# 7. Rabbit Behavior

Rabbits should behave according to priorities rather than simply moving randomly.

A typical rabbit might:

1. Detect a nearby wolf.
2. Flee if the danger is sufficiently high.
3. Otherwise look for nearby grass.
4. Move toward grass.
5. Eat when it reaches the grass.
6. Wander when no important stimulus is present.
7. Reproduce when its conditions are appropriate.

The exact behavior should emerge from the configured rules.

The player should be able to make rabbits:

- extremely cautious
- relatively fearless
- highly reproductive
- slow breeders
- fast
- slow
- highly efficient at finding food
- inefficient at finding food

---

# 8. Wolves

Wolves are predators.

A wolf can:

- wander
- search for rabbits
- chase rabbits
- eat rabbits
- reproduce
- die

### Wolf characteristics

#### Movement Speed

How quickly wolves move.

#### Vision

How far wolves can detect rabbits.

#### Metabolism

How quickly wolves consume energy.

#### Hunting Success

How likely a wolf is to successfully catch a rabbit.

#### Reproduction Threshold

How much energy a wolf needs before reproducing.

#### Reproduction Rate

How likely a healthy wolf is to reproduce.

---

# 9. Wolf Behavior

A typical wolf might:

1. Search for nearby rabbits.
2. Detect a rabbit.
3. Chase it.
4. Attempt to catch it.
5. Eat it if successful.
6. Continue hunting if it remains hungry.
7. Wander if no prey is available.
8. Reproduce when conditions are appropriate.

The player should be able to create:

- highly efficient predators
- inefficient predators
- fast predators
- slow predators
- predators that reproduce aggressively
- predators that reproduce slowly

---

# 10. Energy and Survival

Animals need energy to survive.

Animals gain energy primarily through eating.

Animals lose energy through metabolism and activity.

If an animal's energy reaches zero, it dies.

This creates natural population pressure.

For example:

```text
More rabbits
      ↓
More available prey
      ↓
More wolf reproduction
      ↓
Fewer rabbits
      ↓
Less food for wolves
      ↓
Wolf population declines
      ↓
Rabbit population recovers
```

The game should allow this kind of predator-prey cycle to emerge naturally.

---

# 11. Grass

Grass is the primary resource for rabbits.

Grass can:

- exist
- be consumed
- regenerate

The player can control the global grass regeneration rate.

### Grass Regeneration

Higher regeneration supports larger rabbit populations.

Lower regeneration can create food scarcity.

The player should be able to discover that an ecosystem can collapse even when predator behavior is unchanged simply because there isn't enough food.

---

# 12. Ecosystem Parameters

The player should have a dedicated configuration area.

Parameters should be organized by category.

### Rabbits

- Initial population
- Maximum population
- Movement speed
- Vision
- Metabolism
- Reproduction threshold
- Reproduction rate
- Fear

### Wolves

- Initial population
- Maximum population
- Movement speed
- Vision
- Metabolism
- Hunting success
- Reproduction threshold
- Reproduction rate

### Environment

- World size
- Initial grass amount
- Grass regeneration
- Day/night duration

The player should be able to modify these values before and during the simulation.

---

# 13. Initial Conditions

The game should start with a reasonable default ecosystem.

For example:

```text
Rabbits: 100
Wolves: 15
Grass: abundant
```

The default configuration should produce an interesting simulation rather than immediate extinction.

The exact values should be tuned during development.

The important goal is that the player can press **Play** and immediately see meaningful behavior.

---

# 14. Population Dashboard

The game should display the current state of the ecosystem.

At minimum:

```text
DAY 127

Rabbits       184
Wolves         23
Grass         742

Births         12
Deaths          8
```

The dashboard should update while the simulation runs.

---

# 15. Population Graphs

The player should be able to view population history over time.

At minimum:

- Rabbit population
- Wolf population

The graph should make predator-prey cycles visually obvious.

For example:

```text
Population
  │
300│    /\       /\
  │   /  \     /  \
200│  /    \   /    \
  │ /      \_/      \
100│
  │
  └──────────────────── Time
```

The player should be able to see the consequences of changing a rule.

---

# 16. Simulation Events

Important events should optionally appear in an event feed.

Examples:

> A rabbit was born.

> Wolf population reached 50.

> Grass is becoming scarce.

> Rabbit population is declining rapidly.

> Wolf population has reached a critical level.

The event system should help the player understand what is happening without explaining everything.

The game should avoid turning the experience into a stream of notifications.

Events should be selective and meaningful.

---

# 17. Inspecting Animals

The player can click an individual rabbit or wolf.

An inspection panel should display information such as:

```text
RABBIT #482

Age: 17 days
Energy: 73%
Speed: 4.2
Vision: 18
Generation: 4

Status:
Eating
```

For wolves:

```text
WOLF #27

Age: 31 days
Energy: 61%
Speed: 5.1
Vision: 25
Generation: 3

Status:
Hunting
```

This should allow the player to understand that individual animals can differ.

---

# 18. Individual Variation

Animals should not necessarily be identical.

Individuals may have slightly different characteristics.

For example, two rabbits may have different:

- speed
- vision
- metabolism
- reproduction characteristics

The player should be able to observe these differences.

This creates the foundation for evolutionary behavior.

---

# 19. Mutation and Evolution

When an animal reproduces, its offspring may inherit characteristics from its parent(s).

There should be a small amount of random variation.

For example:

```text
Parent speed: 4.2

Offspring:
4.1
4.3
4.2
4.5
```

Over many generations, traits that improve survival and reproduction may become more common.

The player should be able to observe this happening rather than being explicitly told what the outcome will be.

---

# 20. Species Statistics

The player should be able to inspect aggregate statistics.

For rabbits:

- average speed
- average vision
- average metabolism
- average reproduction rate
- average age
- population

For wolves:

- average speed
- average vision
- average metabolism
- average hunting success
- average age
- population

This allows the player to observe evolutionary changes over long simulations.

---

# 21. Player Experiments

The game should encourage experiments.

The player might create scenarios such as:

### Experiment: Fast Rabbits

Increase rabbit speed.

Observe whether:

- more rabbits escape wolves
- rabbit population increases
- wolves struggle to hunt
- wolf population declines

### Experiment: More Wolves

Increase initial wolf population.

Observe whether:

- rabbits collapse
- wolves subsequently starve
- the ecosystem recovers

### Experiment: Scarce Grass

Reduce grass regeneration.

Observe whether:

- rabbits compete for food
- rabbit population declines
- wolves subsequently decline

The game does not need to explicitly provide these experiments.

Players should discover them naturally.

---

# 22. Presets

Provide several starting presets to make experimentation immediate.

### Balanced

A relatively stable ecosystem.

### Rabbit Paradise

Many rabbits, abundant grass, few wolves.

### Wolf World

Many wolves and scarce rabbits.

### Food Scarcity

Limited grass regeneration.

### Empty World

Very little initial life.

The player can modify any preset.

---

# 23. Reset and Reproducibility

The player should be able to restart an experiment.

A restart should restore the selected initial conditions.

The game should provide a way to reproduce an experiment using the same starting conditions.

The purpose is to allow:

> "I changed one parameter. What happens?"

rather than forcing the player to recreate the entire ecosystem manually.

---

# 24. Visual Design

The visual style should be simple, clean, and readable.

The ecosystem should be the primary visual element.

Animals should be easy to distinguish.

The player should be able to immediately understand:

- where rabbits are
- where wolves are
- where grass exists
- what animals are doing

Animals should have subtle animations for:

- walking
- eating
- hunting
- fleeing
- reproducing
- dying

The visual style should favor clarity over realism.

---

# 25. Simulation Controls

The primary controls should always be easy to access:

```text
▶ Play
⏸ Pause
⏭ Step
↻ Restart

Speed:
1×
5×
20×
100×
```

The player should be able to switch between observing the simulation and modifying its rules without leaving the main screen.

---

# 26. Changing Rules During Simulation

The player should be able to modify ecosystem parameters while the simulation is running.

For example:

> Wolf hunting success: 60% → 40%

The new rule should affect future behavior.

This is an important part of the experience.

The player should not need to restart the simulation every time they want to test a hypothesis.

---

# 27. Long-Running Simulations

The simulation should support running for a long period of simulated time.

The player should be able to leave it running at high speed and return later.

The simulation should remain understandable even when populations change dramatically.

Examples:

```text
Day 10
Rabbits: 100
Wolves: 15

Day 100
Rabbits: 420
Wolves: 52

Day 500
Rabbits: 37
Wolves: 4

Day 1000
Rabbits: 190
Wolves: 21
```

Long-term behavior is an important part of the game.

---

# 28. Failure and Extinction

Extinction should be allowed.

Possible outcomes include:

- all rabbits die
- all wolves die
- both species die
- grass is exhausted
- ecosystem reaches equilibrium

Extinction should not automatically mean "game over."

It should be treated as an interesting result of the player's experiment.

The player can restart or modify the conditions.

---

# 29. No Traditional Win Condition

The MVP should not have a conventional victory condition.

The purpose is experimentation and discovery.

The player succeeds by finding interesting behaviors.

Possible future versions could introduce challenges such as:

> Maintain both species for 1,000 days.

> Create an ecosystem with stable populations.

> Cause a population to evolve a specific trait.

But these should not be required for the initial version.

---

# 30. Desired Player Experience

After playing for a while, the player should naturally start asking questions like:

> "What happens if wolves can see twice as far?"

> "Can I create a stable ecosystem?"

> "Can I make rabbits evolve to become faster?"

> "Can I make wolves go extinct without killing the rabbits?"

> "Can I create oscillating population cycles?"

> "What happens if food becomes extremely scarce?"

> "Can I make an ecosystem where neither species goes extinct for 10,000 days?"

The game should make these questions fun to investigate.

---

# 31. MVP Definition

The MVP is successful when a player can:

1. Start a simulation with rabbits, wolves, and grass.
2. Watch animals move, eat, hunt, reproduce, and die.
3. Change important behavioral and environmental parameters.
4. Pause and resume the simulation.
5. Change simulation speed.
6. Observe population statistics.
7. Observe population graphs.
8. Inspect individual animals.
9. Restart an experiment.
10. Run the ecosystem for many generations.
11. Observe population changes and predator-prey dynamics.
12. See individual variation and basic inheritance.
13. Experiment with different rules and discover different outcomes.

The experience should be compelling **even without a formal game objective**.

---

# 32. Guiding Principle

The most important design principle is:

> **The player defines the rules. The simulation creates the story.**

Avoid scripting interesting outcomes.

If something interesting happens, it should ideally happen because the interaction between simple rules produced it.

The game should make the player feel like they are conducting experiments on a living miniature world.