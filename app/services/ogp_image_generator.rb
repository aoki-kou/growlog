require "vips"

class OgpImageGenerator
  WIDTH = 1200
  HEIGHT = 630
  TITLE_LINE_LENGTH = 18

  def initialize(goal)
    @goal = goal
    @achievement_count = goal.checkins.count
  end

  def call
    image = Vips::Image.svgload_buffer(svg)

    image.pngsave_buffer
  end

  private

  attr_reader :goal, :achievement_count

  def svg
    <<~SVG
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="#{WIDTH}"
        height="#{HEIGHT}"
        viewBox="0 0 #{WIDTH} #{HEIGHT}"
      >
        <defs>
          <linearGradient
            id="background"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stop-color="#dff0e7" />
            <stop offset="100%" stop-color="#f0fdf4" />
          </linearGradient>
        </defs>

        <rect
          width="#{WIDTH}"
          height="#{HEIGHT}"
          fill="url(#background)"
        />

        <rect
          x="70"
          y="55"
          width="1060"
          height="520"
          rx="42"
          fill="#ffffff"
        />

        <text
          x="120"
          y="135"
          fill="#15803d"
          font-size="42"
          font-weight="700"
          font-family="sans-serif"
        >
          GrowLog
        </text>

        #{title_svg}

        <text
          x="600"
          y="440"
          text-anchor="middle"
          fill="#166534"
          font-size="72"
          font-weight="700"
          font-family="sans-serif"
        >
          達成日数 #{achievement_count}日
        </text>

        <text
          x="600"
          y="515"
          text-anchor="middle"
          fill="#64748b"
          font-size="30"
          font-family="sans-serif"
        >
          継続することで、あなたの木が成長します
        </text>
      </svg>
    SVG
  end

  def title_svg
    title_lines.each_with_index.map do |line, index|
      y = 230 + index * 58

      <<~SVG
        <text
          x="600"
          y="#{y}"
          text-anchor="middle"
          fill="#1e293b"
          font-size="48"
          font-weight="600"
          font-family="sans-serif"
        >
          #{ERB::Util.html_escape(line)}
        </text>
      SVG
    end.join
  end

  def title_lines
    escaped_title = "「#{goal.title}」"

    escaped_title.scan(/.{1,#{TITLE_LINE_LENGTH}}/m).first(2)
  end
end