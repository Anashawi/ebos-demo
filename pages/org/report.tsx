import React, { useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import jsPDF from "jspdf";
import GoalsReport from "../../components/report/goals";
import MarketPotentialReport from "../../components/report/market-potential";
import RedOceanReport from "../../components/report/red-ocean";
import BlueOceanReport from "../../components/report/blue-ocean";
import DisruptionReport from "../../components/report/disruption";
import VoiceOfCustomersReport from "../../components/report/voice-of-customers";
import { IUserProduct } from "../../models/user-product";
import * as clientApi from "../../http-client/products.client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import html2canvas from "html2canvas";
import NonCustomersReport from "../../components/report/none-customers";
import PioneerMigratorSettlerReport from "../../components/report/pioneer-migrator-settler";
import StepUpStepDownModelReport from "../../components/report/step-up-step-down-model-report";

const MyComponent = () => {
	const { data: session }: any = useSession();

	const [userProduct, setUserProduct] = useState<IUserProduct>();

	const { data, isLoading } = useQuery<IUserProduct>({
		queryKey: [clientApi.Keys.UserProduct, userProduct?.id],
		queryFn: clientApi.getAll,
		refetchOnWindowFocus: false,
		enabled: !!session?.user?.id,
	});

	useEffect(() => {
		if (data) {
			setUserProduct(data);
		}
	}, [data]);

	const handleDownloadPDF = async () => {
		const a4_width = 2481; // in points
		const a4_height = 3507; // in points

		// Function to add a base64 image to a page in the PDF
		const addBase64ImageToPage = async (
			component: HTMLElement,
			imageContentHeight: number
		) => {
			const scale = 3;
			const canvas = await html2canvas(component, { scale });
			const imageData = canvas.toDataURL("image/png"); // Get base64 image data
			console.log("component.clientWidth", component.clientWidth);
			console.log("component.clientHeight", component.clientHeight);
			console.log("imageContentHeight", imageContentHeight);

			pdf.addImage(
				imageData,
				"PNG",
				20, // X-coordinate for the image
				10, // Y-coordinate for the image
				component.clientWidth - 10,
				imageContentHeight - 10
			);
		};

		const addComponentPages = async (component: HTMLElement) => {
			// const numOfPages = Math.ceil(component.clientHeight / a4_height); // to calc the number of pages needed to contain this component
			// for (let i = 1; i <= numOfPages; i++) {
			pdf.addPage();

			let imageHeight = component.clientHeight;

			// let imageHeight =
			// 	(component.clientHeight -
			// 		((component.clientHeight / a4_height) % 1)) /
			// 	Math.floor(component.clientHeight / a4_height); // the height of image content in a page

			// if (i === numOfPages) {
			// 	imageHeight =
			// 		((component.clientHeight / a4_height) % 1) * a4_height; // to calc the height of image content in the last page
			// }

			await addBase64ImageToPage(component, imageHeight);
			// }
		};

		const pdfContentContainer = document.getElementById(
			"pdf-content-container"
		);

		const pdfContentComponent1 = document.getElementById(
			"pdf-content-component-1"
		);
		const pdfContentComponent2 = document.getElementById(
			"pdf-content-component-2"
		);
		const pdfContentComponent3 = document.getElementById(
			"pdf-content-component-3"
		);
		const pdfContentComponent4 = document.getElementById(
			"pdf-content-component-4"
		);
		const pdfContentComponent5 = document.getElementById(
			"pdf-content-component-5"
		);
		const pdfContentComponent6 = document.getElementById(
			"pdf-content-component-6"
		);
		const pdfContentComponent7 = document.getElementById(
			"pdf-content-component-7"
		);
		const pdfContentComponent8 = document.getElementById(
			"pdf-content-component-8"
		);
		const pdfContentComponent9 = document.getElementById(
			"pdf-content-component-9"
		);
		const pdfContentComponent10 = document.getElementById(
			"pdf-content-component-10"
		);

		if (
			!pdfContentContainer ||
			!pdfContentComponent1 ||
			!pdfContentComponent2 ||
			!pdfContentComponent3 ||
			!pdfContentComponent4 ||
			!pdfContentComponent5 ||
			!pdfContentComponent6 ||
			!pdfContentComponent7 ||
			!pdfContentComponent8 ||
			!pdfContentComponent9 ||
			!pdfContentComponent10
		) {
			console.error(
				"one or more of pdfContentComponents or the Container is/are not defined"
			);
			return;
		}

		// Create a new PDF
		const pdf = new jsPDF({
			orientation: "portrait",
			unit: "px",
			format: [pdfContentContainer.clientWidth, a4_height],
		});

		pdf.deletePage(1);

		await addComponentPages(pdfContentComponent1);
		await addComponentPages(pdfContentComponent2);
		await addComponentPages(pdfContentComponent3);
		await addComponentPages(pdfContentComponent4);
		await addComponentPages(pdfContentComponent5);
		await addComponentPages(pdfContentComponent6);
		await addComponentPages(pdfContentComponent7);
		await addComponentPages(pdfContentComponent8);
		await addComponentPages(pdfContentComponent9);
		await addComponentPages(pdfContentComponent10);

		// Save the PDF
		pdf.save("report.pdf");
	};

	return (
		<div className='py-10 text-dark-400'>
			<div className='w-2/3 mx-auto'>
				<button
					onClick={handleDownloadPDF}
					className='fixed top-16 right-16 btn-primary z-[99999]'>
					Download PDF
				</button>
				<div id='pdf-content-container' className='px-12 py-5'>
					<h1 className='text-5xl font-hero-bold mb-10'>Report</h1>
					<div className='flex flex-col gap-10 min-h-[29.7cm]'>
						<div id='pdf-content-component-1'>
							<GoalsReport />
						</div>
						<div id='pdf-content-component-2'>
							<PioneerMigratorSettlerReport
								userProduct={userProduct}
								isLoading={isLoading}
							/>
						</div>
						<div id='pdf-content-component-3'>
							<MarketPotentialReport
								userProduct={userProduct}
								isLoading={isLoading}
							/>
						</div>
						<div id='pdf-content-component-4'>
							<RedOceanReport
								userProduct={userProduct}
								isLoading={isLoading}
							/>
						</div>
						<div id='pdf-content-component-5'>
							<DisruptionReport />
						</div>
						<div id='pdf-content-component-6'>
							<VoiceOfCustomersReport />
						</div>
						<div id='pdf-content-component-7'>
							<BlueOceanReport
								userProduct={userProduct}
								isLoading={isLoading}
							/>
						</div>
						<div id='pdf-content-component-8'>
							<NonCustomersReport />
						</div>
						<div id='pdf-content-component-9'>
							<StepUpStepDownModelReport />
						</div>
						<div id='pdf-content-component-10'>
							<NonCustomersReport />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyComponent;
