import { Card, CardContent } from "@/components/ui/card";

const InfoCard = () => {
  return (
    <Card className="w-full relative after:content-[url('./src/assets/person-shadow.png')] lg:after:absolute lg:after:top-[79%] lg:after:left-[10%] lg:w-2/4">
      <CardContent className="p-6">
        <p className="text-muted-foreground text-base leading-tight">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In suscipit
          suscipit porttitor. Suspendisse ex lorem, rhoncus nec ante eu,
          venenatis aliquam turpis. Nulla facilisi. Curabitur nec mattis dolor.
          Nulla finibus bibendum ligula tempus vehicula. Ut at tristique libero,
          nec efficitur dui. Aliquam erat volutpat. Fusce quam sem, tempus nec
          justo eget, luctus scelerisque velit. Nam sollicitudin purus urna,
          vitae ornare neque tincidunt vel. Proin ac lacinia erat, et commodo
          felis. Phasellus tempor tellus eu vulputate tempus.
        </p>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
