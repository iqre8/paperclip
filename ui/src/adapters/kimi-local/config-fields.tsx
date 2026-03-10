import type { AdapterConfigFieldsProps } from "../types";
import {
  Field,
  ToggleField,
  DraftInput,
  DraftNumberInput,
  help,
} from "../../components/agent-config-primitives";
import { ChoosePathButton } from "../../components/PathInstructionsModal";

const inputClass =
  "w-full rounded-md border border-border px-2.5 py-1.5 bg-transparent outline-none text-sm font-mono placeholder:text-muted-foreground/40";

const instructionsFileHint =
  "Absolute path to a markdown file (e.g., AGENTS.md) that defines this agent's behavior. Injected into the agent specification at runtime.";

export function KimiLocalConfigFields({
  isCreate,
  values,
  set,
  config,
  eff,
  mark,
}: AdapterConfigFieldsProps) {
  return (
    <Field label="Agent instructions file" hint={instructionsFileHint}>
      <div className="flex items-center gap-2">
        <DraftInput
          value={
            isCreate
              ? values!.instructionsFilePath ?? ""
              : eff(
                  "adapterConfig",
                  "instructionsFilePath",
                  String(config.instructionsFilePath ?? ""),
                )
          }
          onCommit={(v) =>
            isCreate
              ? set!({ instructionsFilePath: v })
              : mark("adapterConfig", "instructionsFilePath", v || undefined)
          }
          immediate
          className={inputClass}
          placeholder="/absolute/path/to/AGENTS.md"
        />
        <ChoosePathButton />
      </div>
    </Field>
  );
}

export function KimiLocalAdvancedFields({
  isCreate,
  values,
  set,
  config,
  eff,
  mark,
}: AdapterConfigFieldsProps) {
  return (
    <>
      <ToggleField
        label="Enable thinking mode"
        hint="Enable Kimi's thinking mode for more thorough reasoning"
        checked={
          isCreate
            ? values!.thinkingEffort !== ""
            : eff("adapterConfig", "thinking", config.thinking === true)
        }
        onChange={(v) =>
          isCreate
            ? set!({ thinkingEffort: v ? "medium" : "" })
            : mark("adapterConfig", "thinking", v)
        }
      />
      <Field label="Max steps per run" hint={help.maxTurnsPerRun}>
        {isCreate ? (
          <input
            type="number"
            className={inputClass}
            value={values!.maxTurnsPerRun}
            onChange={(e) => set!({ maxTurnsPerRun: Number(e.target.value) })}
          />
        ) : (
          <DraftNumberInput
            value={eff(
              "adapterConfig",
              "maxStepsPerRun",
              Number(config.maxStepsPerRun ?? 100),
            )}
            onCommit={(v) => mark("adapterConfig", "maxStepsPerRun", v || 100)}
            immediate
            className={inputClass}
          />
        )}
      </Field>
    </>
  );
}
