<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-transparent">
    <Transition name="fade" mode="out-in">
      <!-- STEP 1: BASE FORM -->
      <UCard
        v-if="step === 1"
        key="step1"
        class="w-full max-w-4xl rounded-2xl shadow-2xl bg-neutral-950/90 border border-neutral-800 flex flex-col gap-6 p-6 sm:p-8 backdrop-blur-md"
      >
        <h2 class="text-xl font-semibold text-gray-100 mb-2">
          Match Submission
        </h2>

        <!-- Row 1 -->
        <div class="grid gap-4 md:grid-cols-3">
          <div>
            <label for="ds_user" class="text-xs font-medium text-gray-300">
              Discord Username
            </label>
            <input
              id="ds_user"
              v-model="form.ds_user"
              type="text"
              placeholder="Username"
              class="input input-bordered w-full mt-1"
            />
          </div>

          <div>
            <label for="division" class="text-xs font-medium text-gray-300">
              Division
            </label>
            <select
              id="division"
              v-model="form.division"
              class="select select-bordered w-full mt-1"
            >
              <option disabled value="">Select Division</option>
              <option v-for="d in divisions" :key="d" :value="d">
                {{ d }}
              </option>
            </select>
          </div>

          <div>
            <label for="week" class="text-xs font-medium text-gray-300">
              Week
            </label>
            <select
              id="week"
              v-model="form.week"
              class="select select-bordered w-full mt-1"
            >
              <option disabled value="">Select Week</option>
              <option v-for="w in weeks" :key="w" :value="w">
                {{ w }}
              </option>
            </select>
          </div>
        </div>

        <!-- Row 2: TEAM SELECTS -->
        <div class="grid gap-4 md:grid-cols-2">
          <div>
            <label for="team1" class="text-xs font-medium text-gray-300">
              Your Team
            </label>
            <select
              id="team1"
              v-model="form.team1Id"
              class="select select-bordered w-full mt-1"
            >
              <option disabled value="">Select Your Team</option>
              <option
                v-for="team in team1Options"
                :key="team.id"
                :value="team.id"
              >
                {{ team.name }} ({{ team.division }})
              </option>
            </select>
          </div>

          <div>
            <label for="team2" class="text-xs font-medium text-gray-300">
              Opponent Team
            </label>
            <select
              id="team2"
              v-model="form.team2Id"
              class="select select-bordered w-full mt-1"
            >
              <option disabled value="">Select Opponent</option>
              <option
                v-for="team in team2Options"
                :key="team.id"
                :value="team.id"
              >
                {{ team.name }} ({{ team.division }})
              </option>
            </select>
          </div>
        </div>

        <!-- Submission type -->
        <div>
          <label
            for="submission_type"
            class="text-xs font-medium text-gray-300"
          >
            Submission Type
          </label>
          <select
            id="submission_type"
            v-model="submissionType"
            class="select select-bordered w-full mt-1"
          >
            <option disabled value="">Select Submission Type</option>
            <option value="manual">Manual Entry</option>
            <option value="replays">Replays</option>
            <option value="ff">Forfeit</option>
          </select>
        </div>

        <!-- Footer: progress + next -->
        <div class="mt-4 flex items-center justify-between">
          <div class="flex gap-2">
            <div :class="bubbleClass(1)" />
            <div :class="bubbleClass(2)" />
          </div>

          <UButton
            class="px-6"
            color="primary"
            variant="solid"
            :disabled="!submissionType"
            @click="goNext"
          >
            Next
          </UButton>
        </div>
      </UCard>

      <!-- STEP 2: MANUAL ENTRY CARD -->
      <UCard
        v-else-if="submissionType === 'manual'"
        key="manual"
        class="w-full max-w-5xl rounded-2xl shadow-2xl bg-neutral-950/90 border border-neutral-800 flex flex-col gap-6 p-6 sm:p-8 backdrop-blur-md"
      >
        <div class="flex items-center justify-between gap-4">
          <h2 class="text-xl font-semibold text-gray-100">
            Manual Entry – Game Stats
          </h2>
          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-400">Game label</span>
            <span
              class="text-xs font-semibold text-gray-200 px-2 py-1 rounded bg-neutral-900/80 border border-neutral-700"
            >
              {{ gameLabel }}
            </span>
          </div>
        </div>

        <!-- Teams block -->
        <div class="grid gap-6 lg:grid-cols-2">
          <!-- TEAM 1 -->
          <section class="space-y-3">
            <h3
              class="text-sm font-semibold text-gray-200 border-b border-neutral-800 pb-1"
            >
              {{ team1Name }}
            </h3>

            <div
              v-for="(p, i) in manual.team1.players"
              :key="'t1-' + i"
              class="rounded-lg bg-neutral-900/70 border border-neutral-800 p-3 space-y-2"
            >
              <div class="flex items-center justify-between gap-3">
                <span class="text-xs font-medium text-gray-400">
                  Player {{ i + 1 }}
                </span>
                <select
                  v-model="p.player"
                  class="select select-bordered select-xs w-full max-w-xs"
                >
                  <option disabled value="">Select player</option>
                  <option
                    v-for="name in team1PlayerOptions"
                    :key="name"
                    :value="name"
                  >
                    {{ name }}
                  </option>
                </select>
              </div>

              <div class="grid grid-cols-5 gap-2">
                <input
                  v-model.number="p.score"
                  type="number"
                  placeholder="Score"
                  class="input input-bordered input-xs"
                />
                <input
                  v-model.number="p.goals"
                  type="number"
                  placeholder="Goals"
                  class="input input-bordered input-xs"
                />
                <input
                  v-model.number="p.assists"
                  type="number"
                  placeholder="AST"
                  class="input input-bordered input-xs"
                />
                <input
                  v-model.number="p.saves"
                  type="number"
                  placeholder="Saves"
                  class="input input-bordered input-xs"
                />
                <input
                  v-model.number="p.shots"
                  type="number"
                  placeholder="Shots"
                  class="input input-bordered input-xs"
                />
              </div>
            </div>
          </section>

          <!-- TEAM 2 -->
          <section class="space-y-3">
            <h3
              class="text-sm font-semibold text-gray-200 border-b border-neutral-800 pb-1"
            >
              {{ team2Name }}
            </h3>

            <div
              v-for="(p, i) in manual.team2.players"
              :key="'t2-' + i"
              class="rounded-lg bg-neutral-900/70 border border-neutral-800 p-3 space-y-2"
            >
              <div class="flex items-center justify-between gap-3">
                <span class="text-xs font-medium text-gray-400">
                  Player {{ i + 1 }}
                </span>
                <select
                  v-model="p.player"
                  class="select select-bordered select-xs w-full max-w-xs"
                >
                  <option disabled value="">Select player</option>
                  <option
                    v-for="name in team2PlayerOptions"
                    :key="name"
                    :value="name"
                  >
                    {{ name }}
                  </option>
                </select>
              </div>

              <div class="grid grid-cols-5 gap-2">
                <input
                  v-model.number="p.score"
                  type="number"
                  placeholder="Score"
                  class="input input-bordered input-xs"
                />
                <input
                  v-model.number="p.goals"
                  type="number"
                  placeholder="Goals"
                  class="input input-bordered input-xs"
                />
                <input
                  v-model.number="p.assists"
                  type="number"
                  placeholder="AST"
                  class="input input-bordered input-xs"
                />
                <input
                  v-model.number="p.saves"
                  type="number"
                  placeholder="Saves"
                  class="input input-bordered input-xs"
                />
                <input
                  v-model.number="p.shots"
                  type="number"
                  placeholder="Shots"
                  class="input input-bordered input-xs"
                />
              </div>
            </div>
          </section>
        </div>

        <!-- Footer -->
        <div class="mt-4 flex items-center justify-between">
          <div class="flex gap-2">
            <div :class="bubbleClass(1)" />
            <div :class="bubbleClass(2)" />
          </div>

          <div class="flex gap-3">
            <UButton variant="ghost" @click="goBack">Back</UButton>
            <UButton color="primary" variant="solid" @click="handleManualSubmit">
              Submit
            </UButton>
          </div>
        </div>
      </UCard>

      <!-- STEP 2: REPLAYS CARD -->
      <UCard
        v-else-if="submissionType === 'replays'"
        key="replays"
        class="w-full max-w-4xl rounded-2xl shadow-2xl bg-neutral-950/90 border border-neutral-800 flex flex-col gap-6 p-6 sm:p-8 backdrop-blur-md"
      >
        <div class="flex items-center justify-between gap-4">
          <h2 class="text-xl font-semibold text-gray-100">
            Replay Submission
          </h2>
          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-400">Game</span>
            <span
              class="text-xs font-semibold text-gray-200 px-2 py-1 rounded bg-neutral-900/80 border border-neutral-700"
            >
              {{ gameLabel }}
            </span>
          </div>
        </div>

        <!-- mode toggle -->
        <div class="flex flex-wrap gap-2 text-xs">
          <button
            type="button"
            class="px-3 py-1 rounded-full border transition-colors"
            :class="
              replay.mode === 'replay'
                ? 'bg-yellow-400 text-black border-yellow-400'
                : 'bg-neutral-900 text-gray-200 border-neutral-700'
            "
            @click="replay.mode = 'replay'"
          >
            Replay Upload
          </button>
          <button
            type="button"
            class="px-3 py-1 rounded-full border transition-colors"
            :class="
              replay.mode === 'ff'
                ? 'bg-yellow-400 text-black border-yellow-400'
                : 'bg-neutral-900 text-gray-200 border-neutral-700'
            "
            @click="replay.mode = 'ff'"
          >
            Forfeit (Choose Forfeiting Team)
          </button>
        </div>

        <!-- Replay upload mode -->
        <div v-if="replay.mode === 'replay'" class="space-y-3">
          <p class="text-xs text-gray-400">
            Upload the replay file for
            <span class="font-semibold">{{ gameLabel }}</span>.
          </p>

          <input
            type="file"
            accept=".replay,.zip,.rar,.gz"
            class="file-input file-input-bordered w-full max-w-md"
            @change="onReplayFileChange"
          />

          <p v-if="replay.file" class="text-xs text-gray-300">
            Selected:
            <span class="font-mono">{{ replay.file.name }}</span>
          </p>
        </div>

        <!-- Forfeit mode -->
        <div v-else class="space-y-3">
          <p class="text-xs text-red-300 font-semibold">
            You are selecting which team <span class="underline">FORFEITED</span>,
            <span class="font-bold">not</span> which team won.
          </p>

          <div>
            <label class="text-xs font-medium text-gray-300">
              Forfeiting Team
            </label>
            <select
              v-model="replay.forfeitingTeam"
              class="select select-bordered w-full mt-1 max-w-sm"
            >
              <option disabled value="">Select forfeiting team</option>
              <option value="team1">{{ team1Name }}</option>
              <option value="team2">{{ team2Name }}</option>
            </select>
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-4 flex items-center justify-between">
          <div class="flex gap-2">
            <div :class="bubbleClass(1)" />
            <div :class="bubbleClass(2)" />
          </div>

          <div class="flex gap-3">
            <UButton variant="ghost" @click="goBack">Back</UButton>
            <UButton
              color="primary"
              variant="solid"
              :disabled="isReplaySubmitDisabled"
              @click="handleReplaySubmit"
            >
              Submit
            </UButton>
          </div>
        </div>
      </UCard>

      <!-- STEP 2: FORFEIT (FULL SERIES) CARD -->
      <UCard
        v-else-if="submissionType === 'ff'"
        key="ff"
        class="w-full max-w-4xl rounded-2xl shadow-2xl bg-neutral-950/90 border border-neutral-800 flex flex-col gap-6 p-6 sm:p-8 backdrop-blur-md"
      >
        <div class="flex items-center justify-between gap-4">
          <h2 class="text-xl font-semibold text-gray-100">
            Forfeit Submission
          </h2>
          <span
            class="text-[11px] uppercase tracking-wide text-gray-400 px-2 py-1 rounded bg-neutral-900/80 border border-neutral-700"
          >
            Full Series Forfeit
          </span>
        </div>

        <p class="text-xs text-gray-400">
          This form is for when a team forfeits the
          <span class="font-semibold">entire series</span> (all games),
          not a single game. You are selecting which team
          <span class="font-semibold text-red-300">forfeited</span>,
          <span class="font-bold">not</span> which team won.
        </p>

        <div class="space-y-4 mt-2">
          <!-- Team that is FFing -->
          <div>
            <label class="text-xs font-medium text-gray-300">
              Team that forfeited the series
            </label>
            <select
              v-model="ffSubmission.forfeitingTeam"
              class="select select-bordered w-full mt-1 max-w-sm"
            >
              <option disabled value="">Select forfeiting team</option>
              <option value="team1">{{ team1Name }}</option>
              <option value="team2">{{ team2Name }}</option>
            </select>
          </div>

          <!-- Proof upload -->
          <div>
            <label class="text-xs font-medium text-gray-300">
              Proof of forfeit
              <span class="text-[10px] text-gray-400 ml-1">
                (screenshot, chat log, etc.)
              </span>
            </label>
            <input
              type="file"
              accept="image/*,.pdf,.txt,.zip"
              class="file-input file-input-bordered w-full max-w-md mt-1"
              @change="onFfFileChange"
            />

            <p v-if="ffSubmission.file" class="text-xs text-gray-300 mt-1">
              Selected:
              <span class="font-mono">{{ ffSubmission.file.name }}</span>
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-4 flex items-center justify-between">
          <div class="flex gap-2">
            <div :class="bubbleClass(1)" />
            <div :class="bubbleClass(2)" />
          </div>

          <div class="flex gap-3">
            <UButton variant="ghost" @click="goBack">Back</UButton>
            <UButton
              color="primary"
              variant="solid"
              :disabled="isFfSubmitDisabled"
              @click="handleFfSubmit"
            >
              Submit
            </UButton>
          </div>
        </div>
      </UCard>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const step = ref(1)
const submissionType = ref('')

const form = ref({
  ds_user: '',
  division: '',
  week: '',
  team1Id: '',
  team2Id: '',
})

const divisions = ['Premier', 'Challenger', 'Open'] // placeholder
const weeks = ['Week 1', 'Week 2', 'Week 3'] // placeholder

// ---- Placeholder "API" teams ----
// replace onMounted body with a fetch/axios call.
const allTeams = ref([])

onMounted(() => {
  // TODO: Replace with real API call
  allTeams.value = [
    { id: 'prem-alpha', name: 'Alpha Esports', division: 'Premier' },
    { id: 'prem-bravo', name: 'Bravo United', division: 'Premier' },
    { id: 'chal-ember', name: 'Ember Squad', division: 'Challenger' },
    { id: 'chal-nova', name: 'Nova Flyers', division: 'Challenger' },
    { id: 'open-wolves', name: 'Wolves FC', division: 'Open' },
    { id: 'open-hawks', name: 'Hawks RL', division: 'Open' },
  ]
})

// Filter teams by division
const teamOptions = computed(() => {
  if (!form.value.division) return allTeams.value
  return allTeams.value.filter(
    (t) => t.division === form.value.division
  )
})

// Prevent same team being chosen for both sides
const team1Options = computed(() =>
  teamOptions.value.filter((t) => t.id !== form.value.team2Id)
)
const team2Options = computed(() =>
  teamOptions.value.filter((t) => t.id !== form.value.team1Id)
)

// Reset team choices when division changes
watch(
  () => form.value.division,
  () => {
    form.value.team1Id = ''
    form.value.team2Id = ''
  }
)

// Selected team helpers
const selectedTeam1 = computed(() =>
  teamOptions.value.find((t) => t.id === form.value.team1Id) || null
)
const selectedTeam2 = computed(() =>
  teamOptions.value.find((t) => t.id === form.value.team2Id) || null
)

const team1Name = computed(() => selectedTeam1.value?.name || 'Team 1')
const team2Name = computed(() => selectedTeam2.value?.name || 'Team 2')

// ---- Manual entry state ----
const makeEmptyPlayerRow = () => ({
  player: '',
  score: null,
  goals: null,
  assists: null,
  saves: null,
  shots: null,
})

const currentGameNumber = ref(1)
const gameLabel = computed(() => `Game ${currentGameNumber.value}`)

const manual = ref({
  gameLabel: 'Game 1',
  team1: {
    players: [makeEmptyPlayerRow(), makeEmptyPlayerRow(), makeEmptyPlayerRow()],
  },
  team2: {
    players: [makeEmptyPlayerRow(), makeEmptyPlayerRow(), makeEmptyPlayerRow()],
  },
})

// These would come from the real roster data once wired
const placeholderPlayers = ['Player A', 'Player B', 'Player C', 'Player D']
const team1PlayerOptions = computed(() => placeholderPlayers)
const team2PlayerOptions = computed(() => placeholderPlayers)

// ---- Replays state ----
const replay = ref({
  mode: 'replay', // 'replay' or 'ff'
  file: null,
  forfeitingTeam: '', // 'team1' or 'team2'
})

const onReplayFileChange = (e) => {
  const target = e.target
  replay.value.file =
    target && target.files && target.files[0] ? target.files[0] : null
}

/* disable submit when missing required stuff */
const isReplaySubmitDisabled = computed(() => {
  if (replay.value.mode === 'replay') {
    return !replay.value.file
  }
  // ff mode
  return !replay.value.forfeitingTeam
})

/* build payload */
const buildReplayPayload = () => ({
  type: 'replays',
  gameLabel: gameLabel.value,
  meta: {
    discord: form.value.ds_user,
    division: form.value.division,
    week: form.value.week,
    team1Id: form.value.team1Id,
    team2Id: form.value.team2Id,
    team1Name: team1Name.value,
    team2Name: team2Name.value,
  },
  mode: replay.value.mode,
  replayFileName:
    replay.value.mode === 'replay' && replay.value.file
      ? replay.value.file.name
      : null,
  forfeit:
    replay.value.mode === 'ff'
      ? {
          forfeitingKey: replay.value.forfeitingTeam, // 'team1' | 'team2'
          forfeitingTeamId:
            replay.value.forfeitingTeam === 'team1'
              ? form.value.team1Id
              : form.value.team2Id,
          forfeitingTeamName:
            replay.value.forfeitingTeam === 'team1'
              ? team1Name.value
              : team2Name.value,
        }
      : null,
})

const handleReplaySubmit = () => {
  const payload = buildReplayPayload()
  console.log('Replay submission payload:', payload)
  // TODO: send to your backend (FormData if you actually upload the file)
}

// ---- Full series FF state ----
const ffSubmission = ref({
  forfeitingTeam: '', // 'team1' or 'team2'
  file: null, // File object
})

const onFfFileChange = (e) => {
  const target = e.target
  ffSubmission.value.file =
    target && target.files && target.files[0] ? target.files[0] : null
}

const isFfSubmitDisabled = computed(() => {
  return !ffSubmission.value.forfeitingTeam || !ffSubmission.value.file
})

const buildFfPayload = () => ({
  type: 'ff',
  scope: 'series', // makes it clear this is full series FF
  meta: {
    discord: form.value.ds_user,
    division: form.value.division,
    week: form.value.week,
    team1Id: form.value.team1Id,
    team2Id: form.value.team2Id,
    team1Name: team1Name.value,
    team2Name: team2Name.value,
  },
  forfeitingKey: ffSubmission.value.forfeitingTeam, // 'team1' | 'team2'
  forfeitingTeamId:
    ffSubmission.value.forfeitingTeam === 'team1'
      ? form.value.team1Id
      : form.value.team2Id,
  forfeitingTeamName:
    ffSubmission.value.forfeitingTeam === 'team1'
      ? team1Name.value
      : team2Name.value,
  proofFileName: ffSubmission.value.file ? ffSubmission.value.file.name : null,
})

const handleFfSubmit = () => {
  const payload = buildFfPayload()
  console.log('Full series FF submission payload:', payload)
  // TODO: send to backend (likely FormData if you’re actually uploading the file)
}

// ---- Navigation ----
const goNext = () => {
  if (!submissionType.value) return
  step.value = 2
}

const goBack = () => {
  step.value = 1
}

// Bubbles
const bubbleClass = (index) => {
  const isActive = index <= step.value
  return [
    'h-2.5 w-2.5 rounded-full border transition-colors duration-200',
    'border-yellow-400',
    isActive ? 'bg-yellow-400' : 'bg-transparent',
  ].join(' ')
}

// ---- Payload builder for manual submission ----
const buildManualPayload = () => ({
  type: 'manual',
  gameLabel: manual.value.gameLabel,
  meta: {
    discord: form.value.ds_user,
    division: form.value.division,
    week: form.value.week,
    team1Id: form.value.team1Id,
    team2Id: form.value.team2Id,
    team1Name: team1Name.value,
    team2Name: team2Name.value,
  },
  team1: {
    id: form.value.team1Id,
    name: team1Name.value,
    players: manual.value.team1.players,
  },
  team2: {
    id: form.value.team2Id,
    name: team2Name.value,
    players: manual.value.team2.players,
  },
})

const handleManualSubmit = () => {
  const payload = buildManualPayload()
  console.log('Manual submission payload:', payload)
  // TODO: send to API
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
