from enum import Enum

class Field(Enum):
	real_time_usage  = "real_time_usage"
	estimated_supply = "estimated_supply"
	real_time_generation  = "real_time_generation"
	avg_usage_per_person  = "avg_usage_per_person"
	supplied_population  = "supplied_population"