"use client";
import useSWR from "swr";
import Select from 'react-select'

const getModels = () => fetch("/api/getEngines").then(res => res.json());

function ModelSelection() {
const {data: models, isLoading } = useSWR("models", getModels);
const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "text-davinci-003"
})
    return (
    <div>
        <Select 
        className="mt-2 mb-2"
        options={models?.modelOptions}
        defaultValue={model}
        placeholder={model}
        isSearchable
        isLoading={isLoading}
        menuPosition="fixed"
        onChange={(e) => setModel(e.value)}
        />
    </div>
  )
}

export default ModelSelection