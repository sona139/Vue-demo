import Enum from "./MISAEnum";
import Resource from "./MISAResource";

const applyObject = [
	{
		Value: Enum.ApplyObject.Collective,
		Field: Resource.ApplyObject.Collective,
	},
	{
		Value: Enum.ApplyObject.Individual,
		Field: Resource.ApplyObject.Individual,
	},
	// {
	// 	Value: Enum.ApplyObject.CollectiveAndIndividula,
	// 	Field: Resource.ApplyObject.CollectiveAndIndividula,
	// },
	// {
	// 	Value: Enum.ApplyObject.Family,
	// 	Field: Resource.ApplyObject.Family,
	// },
];

const commendationLevel = [
	{
		Value: Enum.CommendationLevel.Government,
		Field: Resource.CommendationLevel.Government,
	},
	{
		Value: Enum.CommendationLevel.Provincial,
		Field: Resource.CommendationLevel.Provincial,
	},
	{
		Value: Enum.CommendationLevel.District,
		Field: Resource.CommendationLevel.District,
	},
	{
		Value: Enum.CommendationLevel.Commune,
		Field: Resource.CommendationLevel.Commune,
	},
];

const movementType = [
	{
		Value: Enum.MovementType.Regularly,
		Field: Resource.MovementType.Regularly,
	},
	{
		Value: Enum.MovementType.Batched,
		Field: Resource.MovementType.Batched,
	},
];

const isSytem = [
	{
		Value: Enum.IsSystem.Disable,
		Field: Resource.IsSystem.Disable,
	},
	{
		Value: Enum.IsSystem.Enable,
		Field: Resource.IsSystem.Enable,
	},
];

const paging = [
	{ Value: Enum.Paging.Small, Field: Resource.Paging.Small },
	{ Value: Enum.Paging.Medium, Field: Resource.Paging.Medium },
	{ Value: Enum.Paging.Large, Field: Resource.Paging.Large },
	{ Value: Enum.Paging.ExtraLarge, Field: Resource.Paging.ExtraLarge },
];

export { applyObject, commendationLevel, movementType, isSytem, paging };
