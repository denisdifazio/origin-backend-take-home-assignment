type RiskScore = 'ineligible' | 'economic' | 'regular' | 'responsible';

export interface RiskProfile {
  auto: RiskScore;
  disability: RiskScore;
  home: RiskScore;
  life: RiskScore;
}
