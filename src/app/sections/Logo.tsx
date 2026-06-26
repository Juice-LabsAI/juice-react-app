import svgPaths from "../../imports/5Jun/svg-8xllglvmbk";

/**
 * Juice wordmark, taken verbatim from the Figma trace (viewBox 117.226 × 50.118),
 * scaled responsively via the wrapping element's width. `fill` recolors it
 * (orange #F78146 in the nav, pink #F296AF in the footer).
 */
export default function Logo({ className = "", fill: FILL = "#F78146" }: { className?: string; fill?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 117.226 50.1176"
      fill="none"
      role="img"
      aria-label="Juice"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d={svgPaths.p28a45d00} fill={FILL} />
      <path clipRule="evenodd" d={svgPaths.p1b9de500} fill={FILL} fillRule="evenodd" />
      <path d={svgPaths.p2d289780} fill={FILL} />
      <path d={svgPaths.p1618ae00} fill={FILL} />
      <path d={svgPaths.p1db60b00} fill={FILL} />
      <circle cx="112.365" cy="3.36038" fill={FILL} r="3.36038" />
      <circle cx="46.9533" cy="3.36038" fill={FILL} r="3.36038" />
      <circle cx="23.6535" cy="3.36038" fill={FILL} r="3.36038" />
      <path d={svgPaths.p2c1e6700} fill={FILL} />
      <path d={svgPaths.p38f04d00} fill={FILL} />
      <path d={svgPaths.p79aea00} fill={FILL} />
    </svg>
  );
}
