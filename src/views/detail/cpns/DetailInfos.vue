<script setup>
defineProps({
	topModule: {
		type: Object,
		default: () => ({})
	}
})
</script>

<template>
	<div class="detail-infos">
		<div class="name">{{ topModule.houseName }}</div>
		<div class="tags">
			<template v-for="(item, index) in topModule.houseTags" :key="index">
				<span
					class="item"
					v-if="item.tagText"
					:style="{
						color: item.tagText.color,
						background: item.tagText.background.color
					}"
					>{{ item.tagText.text }}</span
				>
			</template>
		</div>
		<div class="comment extra">
			<div class="left">
				<div class="score">{{ topModule.commentBrief.overall }}</div>
				<div class="title">{{ topModule.commentBrief.scoreTitle }}</div>
				<div class="brief">{{ topModule.commentBrief.commentBrief }}</div>
			</div>
			<div class="right">
				<span class="count">
					{{ topModule.commentBrief.totalCount }}条评论
					<van-icon name="arrow" />
				</span>
			</div>
		</div>
		<div class="position extra">
			<div class="left address">{{ topModule.nearByPosition.address }}</div>
			<div class="right">
				地图.周边
				<van-icon name="arrow" />	
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
	.detail-infos {
		padding: 16px;
		background-color: #fff;
		.name {
			font-weight: 700;
			font-size: 20px;
			color: #333;
			text-align: justify; // 两端对齐，最后一行不生效
			line-height: 24px;
			overflow: hidden;
			margin-bottom: 6px;
		}
		.tags {
			margin: 10px 0;
			.item {
				font-size: 12px;
				margin: 0 2px;
				padding: 1px 3px;
			}
		}
		.extra {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 8px 13px;
			margin: 12px 0;
			border-radius: 5px;
			font-size: 12px;
			background-color: #f5f7fa;
			.right {
				color: var(--primary-color);
			}
		}
		.comment {
			.left {
				display: flex;
				align-items: flex-end;
				.score {
					font-size: 18px;
					font-weight: 700;
					margin: 0 3px;
				}
				.title {
					color: #333;
					font-weight: 700;
					margin: 0 3px;
				}
				.brief {
					color: #666;
				}
			}
		}
		.position {
			.address {
				font-size: 14px;
				font-weight: 700;
				color: #333;
			}
		}
	}
</style>
